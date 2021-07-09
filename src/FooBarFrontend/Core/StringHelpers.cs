using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FooBarFrontend.Core
{
    public class StringHelpers
    {
        private static readonly Random _random = new Random();

        public static string RandomString()
        {
            return RandomString(_random.Next(8, 35));
        }

        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[_random.Next(s.Length)]).ToArray());
        }
    }
}
