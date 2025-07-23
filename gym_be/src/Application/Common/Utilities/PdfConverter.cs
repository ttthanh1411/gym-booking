using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using Aspose.Cells;
using Aspose.Words;
using NPOI.SS.UserModel;
using Org.BouncyCastle.Utilities;

namespace BackEnd.Application.Common.Utilities;

/// <summary>
/// Helper chuyển đổi tài nguyên thành PDF
/// </summary>
public class PdfConverter
{

    private static readonly SemaphoreSlim semaphore = new SemaphoreSlim(50); // Giới hạn tối đa 50 luồng

    static PdfConverter()
    {
        string base64License = "PExpY2Vuc2U+CjxEYXRhPgo8TGljZW5zZWRUbz5TaGFuZ2hhaSBIdWR1biBJbmZvcm1hdGlvbiBUZWNobm9sb2d5IENvLiwgTHRkPC9MaWNlbnNlZFRvPgo8RW1haWxUbz4zMTc3MDE4MDlAcXEuY29tPC9FbWFpbFRvPgo8TGljZW5zZVR5cGU+RGV2ZWxvcGVyIE9FTTwvTGljZW5zZVR5cGU+CjxMaWNlbnNlTm90ZT5MaW1pdGVkIHRvIDEgZGV2ZWxvcGVyLCB1bmxpbWl0ZWQgcGh5c2ljYWwgbG9jYXRpb25zPC9MaWNlbnNlTm90ZT4KPE9yZGVySUQ+MTgwNTE0MjAxMTE2PC9PcmRlcklEPgo8VXNlcklEPjI2NjE2NjwvVXNlcklEPgo8T0VNPlRoaXMgaXMgYSByZWRpc3RyaWJ1dGFibGUgbGljZW5zZTwvT0VNPgo8UHJvZHVjdHM+CjxQcm9kdWN0PkFzcG9zZS5Ub3RhbCBmb3IgLk5FVDwvUHJvZHVjdD4KPC9Qcm9kdWN0cz4KPEVkaXRpb25UeXBlPkVudGVycHJpc2U8L0VkaXRpb25UeXBlPgo8U2VyaWFsTnVtYmVyPjIxMGVjOGU3LTgxZTEtNDUzNy1iNDQ2LTY5MmRlNDk4MTIxNzwvU2VyaWFsTnVtYmVyPgo8U3Vic2NyaXB0aW9uRXhwaXJ5PjIwMTkwNTE3PC9TdWJzY3JpcHRpb25FeHBpcnk+CjxMaWNlbnNlVmVyc2lvbj4zLjA8L0xpY2Vuc2VWZXJzaW9uPgo8TGljZW5zZUluc3RydWN0aW9ucz5odHRwOi8vd3d3LmFzcG9zZS5jb20vY29ycG9yYXRlL3B1cmNoYXNlL2xpY2Vuc2UtaW5zdHJ1Y3Rpb25zLmFzcHg8L0xpY2Vuc2VJbnN0cnVjdGlvbnM+CjwvRGF0YT4KPFNpZ25hdHVyZT5jdEozeUx4U0FQc0JRZDBKY3FmN0NBNTNGek4xWXJ2YUE1ZFNyVHBkRlcvQWZoMGh5S0t3cnkrQzF0aldJT0VGeXpLWVdIK05nbi9IZVhVek1RSkEwUm9vd2NxMTEyblYvUW5yU1NxRG02RkpWTnNzSDRwL1ltWFJqbDdMQml4d1Y4QWJ5V1g4bGhWb3lvazdsSTVrNUs4YmJhSytUOFVyK2pJd1NaQWNtVkE9PC9TaWduYXR1cmU+CjwvTGljZW5zZT4=";
        try
        {
            using MemoryStream ms = new MemoryStream(Convert.FromBase64String(base64License));
            Aspose.Words.License wordsLicense = new();
            wordsLicense.SetLicense(ms);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"⚠️ Lỗi khi cài đặt license Aspose.Words: {ex.Message}");
        }

        try
        {
            using MemoryStream ms = new MemoryStream(Convert.FromBase64String(base64License));
            Aspose.Cells.License cellsLicense = new();
            cellsLicense.SetLicense(ms);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"⚠️ Lỗi khi cài đặt license Aspose.Cells: {ex.Message}");
        }
    }


    // ASPOSE Cần có license key ko phải .dll và cần mua. 
    // Không tối ưu hơn libre lắm nếu không nhiều file dung lượng lớn hoặc format doc bị phức tạp quá
    // File dll anh Được đưa là aspose 19.5.0 


    /// <summary>
    /// Chuyển đổi Word → PDF bằng Aspose (chưa sử dụng, sẽ đổi tên khi cần)
    /// </summary>
    public static async Task<byte[]> Word2PDF(byte[] fileData)
    {
        await semaphore.WaitAsync();
        using var outBypte = new MemoryStream();
        try
        {
            using var ms = new MemoryStream(fileData);
            ms.Position = 0;

            Aspose.Words.Document workbook = new Aspose.Words.Document(ms);

            workbook.Save(outBypte, Aspose.Words.SaveFormat.Pdf);

            Console.WriteLine($"✅ Chuyển đổi Word → PDF thành công");

        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Lỗi trong ConvertWordToPdfAspose: {ex.Message}");
        }
        finally
        {
            semaphore.Release();
        }

        return outBypte.ToArray();
    }

    /// <summary>
    /// Chuyển đổi Excel → PDF bằng Aspose (chưa sử dụng, sẽ đổi tên khi cần)
    /// </summary>
    public static async Task<byte[]> Excel2PDF(byte[] fileData)
    {
        await semaphore.WaitAsync();
        await using var outBytes = new MemoryStream();

        try
        {
            await using var inMs = new MemoryStream(fileData);
            inMs.Position = 0;

            var workbook = new Aspose.Cells.Workbook(inMs);
            //var saveOpts = new Aspose.Cells.PdfSaveOptions
            //{
            //    //gộp mỗi sheet thành 1 trang
            //    OnePagePerSheet = true,
            //    //Fit tất cả cột trong 1 trang
            //    AllColumnsInOnePagePerSheet = true
            //};
            //workbook.Save(outBytes, saveOpts);

            workbook.Save(outBytes, Aspose.Cells.SaveFormat.Pdf);

            Console.WriteLine("✅ Chuyển đổi Excel → PDF thành công");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Lỗi trong ConvertExcelToPdfAspose: {ex.Message}");
        }
        finally
        {
            semaphore.Release();
        }

        return outBytes.ToArray();
    }
}
