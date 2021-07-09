using System;
using System.Text;

namespace FooBarFrontend.Core
{
    public static class HtmlStringExtensions
    {

		/// <summary>
		/// Encodes a string to be represented as a string literal in javascript. The format is essentially a JSON string.
		/// INSPIRED from http://weblog.west-wind.com/posts/2007/Jul/14/Embedding-JavaScript-Strings-from-an-ASPNET-Page
		///
		/// The string returned DOES NOT include outer quotes and expects ' to be used as a quote delimiter in your javascript.
		/// Example Output: Hello \'Rick\'!\r\nRock on
		/// </summary>
		/// <param name="s"></param>
		/// <returns></returns>
		public static string ToScriptString(this string s)
		{
			if (String.IsNullOrWhiteSpace(s))
			{
				return String.Empty;
			}

			StringBuilder sb = new StringBuilder();
			foreach (char c in s)
			{
				switch (c)
				{
					case '\'':
						sb.Append("\\\'");
						break;
					case '\\':
						sb.Append("\\\\");
						break;
					case '\b':
						sb.Append("\\b");
						break;
					case '\f':
						sb.Append("\\f");
						break;
					case '\n':
						sb.Append("\\n");
						break;
					case '\r':
						sb.Append("\\r");
						break;
					case '\t':
						sb.Append("\\t");
						break;
					case '<':
						sb.Append("\\u003c");
						break;
					case '>':
						sb.Append("\\u003e");
						break;
					case '&':
						sb.Append("\\u0026");
						break;
					default:
						sb.Append(c);
						break;
				}
			}

			return sb.ToString();
		}
	}
}
