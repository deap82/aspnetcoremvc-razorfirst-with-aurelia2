using Microsoft.Extensions.Hosting;
using System;

namespace FooBarFrontend.Core
{
    public static class EnvironmentExtensions
    {
		public static bool IsRunningLocally(this IHostEnvironment environment)
		{
			bool result = environment.ResolveBooleanFromEnvironmentVariable(EnvironmentVariables.RunsLocally);
			return result;
		}

		/// <summary>
		/// Checks wether the given environment variable is set or not.
		/// </summary>
		/// <param name="varName">The name of the environment variable. Use constants in <see cref="EnvironmentVariables"/>.</param>
		private static bool IsEnvironmentVariableSet(this IHostEnvironment environment, string varName)
		{
			if (varName == null) return false;

			string envValue = Environment.GetEnvironmentVariable(varName);

			if (string.IsNullOrEmpty(envValue))
				return false;

			return true;
		}

		/// <summary>
		/// Resolves the given environment variable to a boolean.
		/// False if not set.
		/// True if number higher than 0.
		/// False if number lower than 1.
		/// True/False if lower cased string value can be parsed to a boolean.
		/// This enables the environment variable to be set with either 0/1 or tRue/faLse.
		/// </summary>
		/// <param name="varName">The name of the environment variable. Use constants in <see cref="EnvironmentVariables"/>.</param>
		private static bool ResolveBooleanFromEnvironmentVariable(this IHostEnvironment environment, string varName)
		{
			if (varName == null) return false;

			if (!environment.IsEnvironmentVariableSet(varName))
				return false;

			string envValue = Environment.GetEnvironmentVariable(varName);

			if (Int32.TryParse(envValue, out int intValue))
				return intValue > 0;

			if (Boolean.TryParse(envValue.ToLower(), out bool boolValue))
				return boolValue;

			return false;
		}
	}
}
