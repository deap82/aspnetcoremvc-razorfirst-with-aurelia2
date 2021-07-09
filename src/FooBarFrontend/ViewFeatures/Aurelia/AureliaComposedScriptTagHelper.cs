using FooBarFrontend.Core;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;
using static FooBarFrontend.ViewFeatures.TagHelpers.TagHelperConstants;

namespace FooBarFrontend.ViewFeatures.Aurelia
{
    [HtmlTargetElement(HtmlScriptTagName, Attributes = VkWaitForAureliaAttributteName)]
	public class AureliaComposedScriptTagHelper : TagHelper
	{
		public const string AureliaComposedDelayStart = "$(document).on('aurelia-composed', function() {";
		public const string AureliaComposedDelayEnd = "});";

		private const string VkWaitForAureliaAttributteName = "vkth-waitfor-aurelia";

		[HtmlAttributeName(VkWaitForAureliaAttributteName)]
		public bool WaitForAureliaComposedWhenNotAjaxRequest { get; set; }

		[ViewContext]
		public ViewContext ViewContext { get; set; }

		public override void Process(TagHelperContext context, TagHelperOutput output)
		{
			output.Attributes.Remove(new TagHelperAttribute(VkWaitForAureliaAttributteName));

			if (!WaitForAureliaComposedWhenNotAjaxRequest || ViewContext.HttpContext.Request.IsAsyncRequest())
			{
				return;
			}

			output.PreContent.SetHtmlContent(AureliaComposedDelayStart);
			output.PostContent.SetHtmlContent(AureliaComposedDelayEnd);
		}
	}
}
