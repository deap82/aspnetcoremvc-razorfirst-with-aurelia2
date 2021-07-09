using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FooBarFrontend.ViewFeatures.TagHelpers
{
    public static class TagHelperConstants
    {
        private const string AuOneWay = "one-way";
        private const string AuTwoWay = "two-way";
        private const string AuOneTime = "one-time";
        private const string AuModel = "model";

        public const string AuBind = "bind";

        public const string PrefixFbTagHelper = "fbth-";
        public const string PrefixFbAuTagHelper = PrefixFbTagHelper + "au-";
        public const string PrefixDataFb = "data-fb-";

        public const string MvcAction = "action";
        public const string MvcArea = "area";
        public const string MvcController = "controller";

        public const string AspActionAttributeName = "asp-action";
        public const string AspForAttributeName = "asp-for";
        public const string AspRouteAttributeName = "asp-route";
        public const string AspValidationForAttributeName = "asp-validation-for";

        public const string AuBindAttributeSuffix = "." + AuBind;
        public const string AuOneWayAttributeSuffix = "." + AuOneWay;
        public const string AuTwoWayAttributeSuffix = "." + AuTwoWay;
        public const string AuOneTimeAttributeSuffix = "." + AuOneTime;

        public const string AuModelBindAttributeName = AuModel + AuBindAttributeSuffix;

        public const string HtmlAnchorTagName = "a";
        public const string HtmlButtonTagName = "button";
        public const string HtmlDivTagName = "div";
        public const string HtmlFormTagName = "form";
        public const string HtmlInputTagName = "input";
        public const string HtmlLabelTagName = "label";
        public const string HtmlNavTagName = "nav";
        public const string HtmlOptionTagName = "option";
        public const string HtmlScriptTagName = "script";
        public const string HtmlSelectTagName = "select";
        public const string HtmlSpanTagName = "span";
        public const string HtmlTextAreaTagName = "textarea";

        public const string HtmlActionAttributeName = "action";
        public const string HtmlCheckedAttributeName = "checked";
        public const string HtmlClassAttributeName = "class";
        public const string HtmlDisabledAttributeName = "disabled";
        public const string HtmlForAttributeName = "for";
        public const string HtmlHrefAttributeName = "href";
        public const string HtmlIdAttributeName = "id";
        public const string HtmlMethodAttributeName = "method";
        public const string HtmlNameAttributeName = "name";
        public const string HtmlOnclickAttributeName = "onclick";
        public const string HtmlSelectedAttributeName = "selected";
        public const string HtmlTargetAttributeName = "target";
        public const string HtmlTypeAttributeName = "type";
        public const string HtmlValueAttributeName = "value";

        public const string HtmlButtonAttributeValue = "button";
        public const string HtmlCheckboxAttributeValue = "checkbox";
        public const string HtmlCheckedAttributeValue = "checked";
        public const string HtmlDateAttributeValue = "date";
        public const string HtmlDisabledAttributeValue = "disabled";
        public const string HtmlFileAttributeValue = "file";
        public const string HtmlPostAttributeValue = "post";
        public const string HtmlRadioAttributeValue = "radio";
        public const string HtmlSelectedAttributeValue = "selected";
        public const string HtmlSubmitAttributeValue = "submit";
        public const string HtmlTimeAttributeValue = "time";
        public const string HtmlTrueAttributeValue = "true";

        public const string CssTypeCheckboxSelector = "[" + HtmlTypeAttributeName + "='" + HtmlCheckboxAttributeValue + "']";
        public const string CssTypeDateSelector = "[" + HtmlTypeAttributeName + "='" + HtmlDateAttributeValue + "']";
        public const string CssTypeFileSelector = "[" + HtmlTypeAttributeName + "='" + HtmlFileAttributeValue + "']";
        public const string CssTypeSubmitSelector = "[" + HtmlTypeAttributeName + "='" + HtmlSubmitAttributeValue + "']";
        public const string CssTypeTimeSelector = "[" + HtmlTypeAttributeName + "='" + HtmlTimeAttributeValue + "']";

        public const string JsChangeEventName = "change";

        public const string JsHrefNoop = "javascript:void(0);";
    }   
}
