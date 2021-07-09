using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FooBarFrontend.Core
{
    public static class HttpRequestExtensions
    {
        /// <summary>
        /// Determines whether the specified HTTP request is an AJAX request or a Fetch request.
        /// http://stackoverflow.com/a/35362280/226589
        /// </summary>
        /// 
        /// <returns>
        /// true if the specified HTTP request is an AJAX request or a Fetch request; otherwise, false.
        /// </returns>
        /// <param name="request">The HTTP request.</param><exception cref="T:System.ArgumentNullException">The <paramref name="request"/> parameter is null (Nothing in Visual Basic).</exception>
        public static bool IsAsyncRequest(this HttpRequest request)
        {
            if (request == null)
                throw new ArgumentNullException(nameof(request));

            if (request.Headers != null)
                return request.Headers["X-Requested-With"] == "XMLHttpRequest"
                       || request.Headers["X-Requested-With"] == "Fetch";

            return false;
        }
    }
}
