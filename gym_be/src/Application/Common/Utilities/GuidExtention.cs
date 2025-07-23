using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackEnd.Application.Common.Utilities;
public static class GuidExtention
{
    public static string ClearAndUper(this Guid guild)
    {
        return guild.ToString().Replace("-", "").ToUpper();
    }
}
