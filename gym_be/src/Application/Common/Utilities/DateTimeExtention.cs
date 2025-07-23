using System;
using System.Reflection.Metadata;
using System.Runtime.InteropServices;

namespace BackEnd.Application.Common.Utilities;

public static class DateTimeExtention
{
    public static long ToUnixEpochDate(this DateTime date)
    {
        return new DateTimeOffset(date).ToUniversalTime().ToUnixTimeSeconds();
    }

    public static string ToISOString(this DateTime time, string format = "o")
    {
        return time.ToString(format);
    }

    public static long FormatDateTimeLong(this DateTime instant)
    {
        return long.Parse(instant.ToString("yyyyMMddHHmmss"));
    }

}

