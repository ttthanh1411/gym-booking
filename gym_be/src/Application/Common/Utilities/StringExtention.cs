using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;


namespace BackEnd.Application.Common.Utilities;

public static class StringExtention
{
    public static string ToUnSign(this string s, char replaceSpace = ' ', bool toUpper = false)
    {
        if (s == null)
        {
            s = "";
        }
        //s = Regex.Replace(s, @"[^\w\d]", " "); //xoá hết ký tự đặc biệt
        s = Regex.Replace(s, @"\s+", " "); //xoá nhiều khoảng trắng liền nhau
        Regex regex = new Regex("\\p{IsCombiningDiacriticalMarks}+");
        string temp = s.Normalize(NormalizationForm.FormD);
        string result = regex.Replace(temp, string.Empty).Replace('\u0111', 'd').Replace('\u0110', 'D');
        if (replaceSpace != ' ')
        {
            result = result.Replace(' ', replaceSpace);
        }
        if (toUpper)
        {
            result = result.ToUpper();
        }
        else
        {
            result = result.ToLower();
        }
        return result.Trim();
    }

    public static bool HasUnSign(this string s)
    {
        if (s == null)
        {
            return false;
        }
        s = Regex.Replace(s, @"[^\w\d]", "[CODAU]");
        if (s.IndexOf("[CODAU]") != -1)
        {
            return true;
        }
        return false;
    }


    public static string FirstCharToUpper(this string input)
    {
        if (string.IsNullOrEmpty(input))
            throw new ArgumentException("ARGH!");
        return input.First().ToString().ToUpper() + string.Join("", input.Skip(1));
    }

    public static string FirstCharToLoower(this string input)
    {
        if (string.IsNullOrEmpty(input))
            throw new ArgumentException("ARGH!");
        return input.First().ToString().ToLower() + string.Join("", input.Skip(1));
    }

    public static bool HasValue(this string? s)
    {
        return !string.IsNullOrEmpty(s);
    }

    public static bool HasValue(this object s, long? endDate)
    {
        return s != null;
    }

    public static DateTime? ToDate(this string s, string fomat = "dd/MM/yyyy")
    {
        DateTime result;
        if (DateTime.TryParseExact(s, fomat, null, System.Globalization.DateTimeStyles.None, out result))
        {
            return result;
        }
        else
        {
            return null;
        }
    }

    public static bool ValidDate(this string s, string fomat = "dd/MM/yyyy")
    {
        DateTime result;
        if (DateTime.TryParseExact(s, fomat, null, System.Globalization.DateTimeStyles.None, out result))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public static bool ValidEmail(this string s)
    {
        try
        {
            var check = new MailAddress(s);
            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }

    public static string RenderTemplate<T>(this string sourse, T model)
    {
        foreach (var prop in typeof(T).GetProperties())
        {
            sourse = sourse.Replace($"{{{{{prop.Name}}}}}", prop.GetValue(model)?.ToString());
        }
        return sourse;
    }

    public static long[] ToLongArray(this string source)
    {
        if (!source.HasValue()) return [];
        return source.Split(",").Select(x => long.Parse(x)).ToArray();
    }

    //public static string MD5Hash(this string input)
    //{
    //    using (var md5 = MD5.Create())
    //    {
    //        byte[] inputBytes = Encoding.ASCII.GetBytes(input);
    //        byte[] hashBytes = md5.ComputeHash(inputBytes);
    //        return Convert.ToHexString(hashBytes);
    //    }
    //}
}

