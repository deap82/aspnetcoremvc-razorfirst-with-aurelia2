using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Reflection;

namespace FooBarFrontend.Core
{
    public static class JsonHelpers
    {
        public static JsonSerializerSettings CreateJsonSerializerSettings(Formatting formatting = Formatting.None, NullValueHandling nullValueHandling = NullValueHandling.Include, bool nullToEmptyLists = true)
        {
            var settings = new JsonSerializerSettings
            {
                ContractResolver = new FooBarContractResolver() { ConvertNullToEmptyList = nullToEmptyLists },
                Formatting = formatting,
                NullValueHandling = nullValueHandling,
                StringEscapeHandling = StringEscapeHandling.Default
            };
            settings.Converters.Add(new FooBarDateConverter());
            settings.Converters.Add(new SelectListItemConverter());

            return settings;
        }
    }

    #region Converters
    public class FooBarDateConverter : IsoDateTimeConverter
    {
        public FooBarDateConverter()
        {
            Culture = new CultureInfo("sv-SE"); //Force ISO 8601
            DateTimeFormat = "d";
        }
    }

    public class SelectListItemConverter : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return typeof(SelectListItem).IsAssignableFrom(objectType);
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            return serializer.Deserialize(reader, objectType);
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            SelectListItem entity = value as SelectListItem;
            writer.WriteStartObject();
            writer.WritePropertyName(nameof(SelectListItem.Value).ToCamelCase());
            writer.WriteValue(entity.Value);
            writer.WritePropertyName(nameof(SelectListItem.Text).ToCamelCase());
            writer.WriteValue(entity.Text);
            writer.WriteEndObject();
        }
    }
    #endregion

    #region Resolvers
    public class CamelCaseExceptDictionaryKeysResolver : CamelCasePropertyNamesContractResolver
    {
        protected override JsonDictionaryContract CreateDictionaryContract(Type objectType)
        {
            var contract = base.CreateDictionaryContract(objectType);
            contract.DictionaryKeyResolver = propertyName => propertyName;
            return contract;
        }
    }

    //Inspired from http://stackoverflow.com/a/25150302/226589
    public class NullToEmptyListResolver : CamelCaseExceptDictionaryKeysResolver
    {
        public bool ConvertNullToEmptyList { get; set; } = true;

        protected override IValueProvider CreateMemberValueProvider(MemberInfo member)
        {
            IValueProvider provider = base.CreateMemberValueProvider(member);

            if (ConvertNullToEmptyList && member.MemberType == MemberTypes.Property)
            {
                Type propType = ((PropertyInfo)member).PropertyType;
                TypeInfo propTypeInfo = propType.GetTypeInfo();
                if (propTypeInfo.IsGenericType &&
                    propType.GetGenericTypeDefinition() == typeof(List<>))
                {
                    return new EmptyListValueProvider(provider, propType);
                }
            }

            return provider;
        }

        class EmptyListValueProvider : IValueProvider
        {
            private IValueProvider innerProvider;
            private object defaultValue;

            public EmptyListValueProvider(IValueProvider innerProvider, Type listType)
            {
                this.innerProvider = innerProvider;
                defaultValue = Activator.CreateInstance(listType);
            }

            public void SetValue(object target, object value)
            {
                innerProvider.SetValue(target, value ?? defaultValue);
            }

            public object GetValue(object target)
            {
                return innerProvider.GetValue(target) ?? defaultValue;
            }
        }
    }

    public class FooBarContractResolver : NullToEmptyListResolver
    {
        //Marker class
        //As Json.net don't accept multiple contract resolvers we need to use inheritance.
        //For additional needs of custom contract resolvers, add your new one to the inheritance chain by changing the inheritance of this class
        //and let your new resolver inherit from the one currently inherited here.
    } 
    #endregion
}
