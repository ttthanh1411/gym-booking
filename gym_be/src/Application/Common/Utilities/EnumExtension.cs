using System;
using System.ComponentModel;
using System.Reflection;

namespace BackEnd.Application.Common.Utilities;

public static class EnumExtension
{
    public static string? GetName(this Enum source)
    {
        FieldInfo? fi = source.GetType()?.GetField(source.ToString());
        if (fi == null) return null;
        var attributes = (DescriptionAttribute[])fi.GetCustomAttributes(typeof(DescriptionAttribute), false);
        return attributes.Length > 0 ? attributes[0].Description : source.ToString();
    }
}

