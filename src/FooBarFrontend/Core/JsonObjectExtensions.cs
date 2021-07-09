using Newtonsoft.Json;

namespace FooBarFrontend.Core
{
    public static class JsonObjectExtensions
	{
		public static string ToJsonCamelCase(this object obj,
			Formatting formatting = Formatting.None, NullValueHandling nullValueHandling = NullValueHandling.Include, DefaultValueHandling defaultValueHandling = DefaultValueHandling.Include,
			bool nullToEmptyLists = true, bool escapeForHtmlAttribute = false)
		{
			var settings = JsonHelpers.CreateJsonSerializerSettings(formatting, nullValueHandling, nullToEmptyLists);
			settings.DefaultValueHandling = defaultValueHandling;
			string jsonObject = JsonConvert.SerializeObject(obj, settings);

			if (escapeForHtmlAttribute)
			{
				jsonObject = jsonObject
					.Replace(@"'", @"\'")
					.Replace(@"{""", "{'")
					.Replace(@"""}", "'}")
					.Replace(@""":""", "':'")
					.Replace(@""":", "':")
					.Replace(@":""", ":'")
					.Replace(@""",""", "','")
					.Replace(@""",", "',")
					.Replace(@",""", ",'")
					.Replace(@"\""", "&quot;");
			}

			return jsonObject;
		}
	}
}
