using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FooBarFrontend.Core
{
    public static class StringExtensions
    {
		public static string ToCamelCase(this string value)
		{
			string result = string.Empty;
			string[] parts = value.Split('.');

			for (int i = 0; i < parts.Length; i++)
			{
				if (i > 0)
				{
					result += ".";
				}
				string part = parts[i][0].ToString().ToLowerInvariant() + parts[i].Substring(1); //Make camelCase;
				result += part;
			}

			return result;
		}

	}
}
