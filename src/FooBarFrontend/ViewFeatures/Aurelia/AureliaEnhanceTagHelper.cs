using FooBarFrontend.Core;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;
using System;
using System.Collections.Generic;
using System.Linq;
using static FooBarFrontend.ViewFeatures.TagHelpers.TagHelperConstants;

namespace FooBarFrontend.ViewFeatures.Aurelia
{
    [HtmlTargetElement(Attributes = AuEnhanceAttributeName)]
	[HtmlTargetElement(Attributes = AuEnhanceModuleAttributeName)]
	[HtmlTargetElement(Attributes = AuEnhanceDataAttributeName)]
	[HtmlTargetElement(Attributes = AuEnhanceModelAttributeName)]
	public class AureliaEnhanceTagHelper : TagHelper
	{
		private const string AuEnhanceAttributeName = "fbth-aurelia-enhance";
		private const string AuEnhanceModuleAttributeName = "fbth-aurelia-enhance-module";
		private const string AuEnhanceDataAttributeName = "fbth-aurelia-enhance-data";
		private const string AuEnhanceGlobalAttributeName = "fbth-aurelia-enhance-global";
		private const string AuEnhanceModelAttributeName = "fbth-aurelia-enhance-model";
		private const string AuEnhanceInjectableAttributeName = "fbth-aurelia-enhance-injectable-as";
		private const string AuEnhanceInjectAsAttributePrefix = "fbth-aurelia-enhance-inject-as-";

		[ViewContext]
		public ViewContext ViewContext { get; set; }

		/// <summary>
		/// This attribute can be set to true to aurelia enhance an element without any client side module.
		/// This attribute is redundant if any other fbth-aurelia-enhance-* attribute is set.
		/// </summary>
		[HtmlAttributeName(AuEnhanceAttributeName)]
		public bool Enhance { get; set; }

		/// <summary>
		/// Path to the ts module that exposes a "createMetaData" function that returns data needed to instantiate the client side model this markup will be bound to.
		/// </summary>
		[HtmlAttributeName(AuEnhanceModuleAttributeName)]
		public string ModulePath { get; set; }

		/// <summary>
		/// An optional data object the client side model should contain. This object should be assigned to member "data" of the client side model, through constructor injection.
		/// If module is not set a client side model will be created where this data will be located through a property called "data".
		/// </summary>
		[HtmlAttributeName(AuEnhanceDataAttributeName)]
		public object DataModel { get; set; }


		/// <summary>
		/// A javascript object in a string that will be used as the view model for the enhanced markup.
		/// Not for production use. Used for demo purposes.
		/// </summary>
		[HtmlAttributeName(AuEnhanceModelAttributeName)]
		public string Model { get; set; }

		/// <summary>
		/// The client side model created from the modules "createMetaData" function will be assigned to this name in the global scope, if set.
		/// This is primarily used for being able to call in to the client side model from a data-ajax-sucess attribute on a form element.
		/// This attribute requires that -module and/or -data is set.
		/// </summary>
		[HtmlAttributeName(AuEnhanceGlobalAttributeName)]
		public string Global { get; set; }

		/// <summary>
		/// A name under which the data of the created view model instance will be possible to inject also into other view models.
		/// </summary>
		[HtmlAttributeName(AuEnhanceInjectableAttributeName)]
		public string InjectableAs { get; set; }

		private IDictionary<string, string> _allInjectAs;
		/// <summary>
		/// Use <c>fbth-aurelia-enhance-inject-as-*</c> to inject view model data that has been injectable using the <see cref="InjectableAs"/> attribute.
		/// <para>The dictionary key (*) will be appended to the view model as a property parallell to the <c>data</c> property.</para>
		/// <para>The value of the attribute should be the name used in the <see cref="InjectableAs"/> attribute on the enhanced element whose data you want to inject.</para>
		/// <para>This attribute is ignored if fbth-aurelia-enhance-module is set, in that case you should inject the view model data in the .ts file using a string key
		/// in the @inject decorator. The string key is the name used in the <see cref="InjectableAs"/> attribute on the enhanced element whose data you want to inject.</para>
		/// </summary>
		[HtmlAttributeName("fbth-au-all-inject-as", DictionaryAttributePrefix = AuEnhanceInjectAsAttributePrefix)]
		public IDictionary<string, string> AllInjectAs
		{
			get
			{
				return _allInjectAs ??
					   (_allInjectAs = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase));
			}
			set
			{
				_allInjectAs = value;
			}
		}

		public override void Process(TagHelperContext context, TagHelperOutput output)
		{
			if (!Enhance)
			{
				Enhance = !String.IsNullOrEmpty(ModulePath) || DataModel != null || !String.IsNullOrEmpty(Model);
			}

			if (!Enhance)
			{
				return;
			}

			string elementId;
			if (!output.Attributes.ContainsName(HtmlIdAttributeName))
			{
				elementId = StringHelpers.RandomString(8);
				output.Attributes.SetAttribute(HtmlIdAttributeName, elementId);
			}
			else
			{
				elementId = Convert.ToString(output.Attributes[HtmlIdAttributeName].Value);
			}

			string dataAsJson = "undefined";
			if (DataModel != null)
			{
				string strDataModel = Convert.ToString(DataModel);
				if (DataModel is string && strDataModel.StartsWith("{")) //We assume it already is a json object that might event contain functions, se we can't serialize it.
				{
					dataAsJson = strDataModel;
				}
				else
				{
					dataAsJson = DataModel.ToJsonCamelCase();
				}
			}

			string injectionDictionary = "null";
			if (String.IsNullOrEmpty(ModulePath) && AllInjectAs?.Keys != null && AllInjectAs.Keys.Any())
			{
				injectionDictionary = AllInjectAs.ToJsonCamelCase();
			}

			string scriptTag = $@"<script>
	requirejs(['common/core/aurelia-enhancer'], (enhancer) => {{
		enhancer.enhanceServerHtml('{elementId}', '{ModulePath ?? string.Empty}', '{dataAsJson.ToScriptString()}', '{Global}', '{InjectableAs ?? string.Empty}', {injectionDictionary})
	}});
</script>";
			scriptTag = scriptTag.Replace(", '')", ")"); //Removes global arg if empty
			scriptTag = scriptTag.Replace(", undefined)", ")"); //Removes data arg if undefined
			scriptTag = scriptTag.Replace(", '')", ")"); //Removes module path arg if empty

			if (!string.IsNullOrEmpty(Model) && Model.StartsWith("{"))
			{
				scriptTag = $@"<script>
	requirejs(['common/core/aurelia-enhancer'], (enhancer) => {{
		enhancer.enhanceServerHtmlWithModel('{elementId}', {Model}, '{Global}');
	}});
</script>";
				scriptTag = scriptTag.Replace(", '')", ")"); //Removes global arg if empty
			}

			//if (!ViewContext.HttpContext.Request.IsAsyncRequest())
			//{
			//	scriptTag = scriptTag.Replace("<script>", "<script>" + AureliaComposedScriptTagHelper.AureliaComposedDelayStart);
			//	scriptTag = scriptTag.Replace("</script>", AureliaComposedScriptTagHelper.AureliaComposedDelayEnd + "</script>");
			//}

			output.PostContent.AppendHtml(scriptTag);
		}
	}
}
