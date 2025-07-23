using System;
using System.Collections.Generic;
using BackEnd.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Infrastructure.Data;

public partial class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Appointment> Appointments { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Invoice> Invoices { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<QrBooking> QrBookings { get; set; }

    public virtual DbSet<Recommendation> Recommendations { get; set; }

    public virtual DbSet<Schedule> Schedules { get; set; }

    public virtual DbSet<Service> Services { get; set; }

    public virtual DbSet<Workoutcourse> Workoutcourses { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Appointment>(entity =>
        {
            entity.HasKey(e => e.Appointmentid).HasName("appointment_pkey");

            entity.ToTable("appointment");

            entity.HasIndex(e => e.Appointmentdate, "idx_appointment_date");

            entity.Property(e => e.Appointmentid)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("appointmentid");
            entity.Property(e => e.Appointmentdate).HasColumnName("appointmentdate");
            entity.Property(e => e.Appointmentname)
                .HasMaxLength(50)
                .HasColumnName("appointmentname");
            entity.Property(e => e.Appointmenttime).HasColumnName("appointmenttime");
            entity.Property(e => e.Customerid).HasColumnName("customerid");
            entity.Property(e => e.Price)
                .HasPrecision(10, 2)
                .HasColumnName("price");
            entity.Property(e => e.Scheduleid).HasColumnName("scheduleid");
            entity.Property(e => e.Serviceid).HasColumnName("serviceid");
            entity.Property(e => e.Status).HasColumnName("status");

            entity.HasOne(d => d.Customer).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.Customerid)
                .HasConstraintName("appointment_customerid_fkey");

            entity.HasOne(d => d.Schedule).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.Scheduleid)
                .HasConstraintName("appointment_scheduleid_fkey");

            entity.HasOne(d => d.Service).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.Serviceid)
                .HasConstraintName("appointment_serviceid_fkey");

            entity.HasMany(d => d.Services).WithMany(p => p.AppointmentsNavigation)
                .UsingEntity<Dictionary<string, object>>(
                    "AppointmentService",
                    r => r.HasOne<Service>().WithMany()
                        .HasForeignKey("Serviceid")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("appointment_service_serviceid_fkey"),
                    l => l.HasOne<Appointment>().WithMany()
                        .HasForeignKey("Appointmentid")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("appointment_service_appointmentid_fkey"),
                    j =>
                    {
                        j.HasKey("Appointmentid", "Serviceid").HasName("appointment_service_pkey");
                        j.ToTable("appointment_service");
                        j.IndexerProperty<Guid>("Appointmentid").HasColumnName("appointmentid");
                        j.IndexerProperty<Guid>("Serviceid").HasColumnName("serviceid");
                    });
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.Customerid).HasName("customer_pkey");

            entity.ToTable("customer");

            entity.HasIndex(e => e.Email, "customer_email_key").IsUnique();

            entity.HasIndex(e => e.Email, "idx_customer_email");

            entity.HasIndex(e => e.Phonenumber, "idx_customer_phone");

            entity.Property(e => e.Customerid)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("customerid");
            entity.Property(e => e.Address)
                .HasMaxLength(200)
                .HasColumnName("address");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .HasColumnName("email");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .HasColumnName("password");
            entity.Property(e => e.Phonenumber)
                .HasMaxLength(10)
                .HasColumnName("phonenumber");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.Type).HasColumnName("type");
        });

        modelBuilder.Entity<Invoice>(entity =>
        {
            entity.HasKey(e => e.Invoiceid).HasName("invoice_pkey");

            entity.ToTable("invoice");

            entity.HasIndex(e => e.Issuedate, "idx_invoice_issuedate");

            entity.Property(e => e.Invoiceid)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("invoiceid");
            entity.Property(e => e.Appointmentid).HasColumnName("appointmentid");
            entity.Property(e => e.Detail)
                .HasMaxLength(256)
                .HasColumnName("detail");
            entity.Property(e => e.Issuedate)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("issuedate");
            entity.Property(e => e.Paymentid).HasColumnName("paymentid");
            entity.Property(e => e.Total)
                .HasPrecision(10, 2)
                .HasColumnName("total");

            entity.HasOne(d => d.Appointment).WithMany(p => p.Invoices)
                .HasForeignKey(d => d.Appointmentid)
                .HasConstraintName("invoice_appointmentid_fkey");

            entity.HasOne(d => d.Payment).WithMany(p => p.Invoices)
                .HasForeignKey(d => d.Paymentid)
                .HasConstraintName("invoice_paymentid_fkey");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.Paymentid).HasName("payment_pkey");

            entity.ToTable("payment");

            entity.Property(e => e.Paymentid)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("paymentid");
            entity.Property(e => e.Amount)
                .HasPrecision(10, 2)
                .HasColumnName("amount");
            entity.Property(e => e.Method).HasColumnName("method");
            entity.Property(e => e.Paidat)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("paidat");
            entity.Property(e => e.Status).HasColumnName("status");
        });

        modelBuilder.Entity<QrBooking>(entity =>
        {
            entity.HasKey(e => e.Qrid).HasName("qr_booking_pkey");

            entity.ToTable("qr_booking");

            entity.Property(e => e.Qrid)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("qrid");
            entity.Property(e => e.Customerid).HasColumnName("customerid");
            entity.Property(e => e.Scanned).HasColumnName("scanned");
            entity.Property(e => e.Type).HasColumnName("type");
            entity.Property(e => e.Value)
                .HasMaxLength(256)
                .HasColumnName("value");

            entity.HasOne(d => d.Customer).WithMany(p => p.QrBookings)
                .HasForeignKey(d => d.Customerid)
                .HasConstraintName("qr_booking_customerid_fkey");
        });

        modelBuilder.Entity<Recommendation>(entity =>
        {
            entity.HasKey(e => e.Rcmid).HasName("recommendation_pkey");

            entity.ToTable("recommendation");

            entity.Property(e => e.Rcmid)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("rcmid");
            entity.Property(e => e.Courseid).HasColumnName("courseid");
            entity.Property(e => e.Customerid).HasColumnName("customerid");
            entity.Property(e => e.Generatedat)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("generatedat");
            entity.Property(e => e.Peakhouralert)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("peakhouralert");
            entity.Property(e => e.Rcmgoals)
                .HasMaxLength(50)
                .HasColumnName("rcmgoals");
            entity.Property(e => e.Suggestedcourse)
                .HasMaxLength(50)
                .HasColumnName("suggestedcourse");

            entity.HasOne(d => d.Course).WithMany(p => p.Recommendations)
                .HasForeignKey(d => d.Courseid)
                .HasConstraintName("recommendation_courseid_fkey");

            entity.HasOne(d => d.Customer).WithMany(p => p.Recommendations)
                .HasForeignKey(d => d.Customerid)
                .HasConstraintName("recommendation_customerid_fkey");
        });

        modelBuilder.Entity<Schedule>(entity =>
        {
            entity.HasKey(e => e.Scheduleid).HasName("schedule_pkey");

            entity.ToTable("schedule");

            entity.Property(e => e.Scheduleid)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("scheduleid");
            entity.Property(e => e.Dayofweek)
                .HasMaxLength(10)
                .HasColumnName("dayofweek");
            entity.Property(e => e.Endtime)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("endtime");
            entity.Property(e => e.Maxparticipants).HasColumnName("maxparticipants");
            entity.Property(e => e.Starttime)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("starttime");
        });

        modelBuilder.Entity<Service>(entity =>
        {
            entity.HasKey(e => e.Serviceid).HasName("service_pkey");

            entity.ToTable("service");

            entity.Property(e => e.Serviceid)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("serviceid");
            entity.Property(e => e.Coursedescription)
                .HasMaxLength(256)
                .HasColumnName("coursedescription");
            entity.Property(e => e.Servicename)
                .HasMaxLength(50)
                .HasColumnName("servicename");
            entity.Property(e => e.Serviceprice)
                .HasPrecision(10, 2)
                .HasColumnName("serviceprice");
        });

        modelBuilder.Entity<Workoutcourse>(entity =>
        {
            entity.HasKey(e => e.Courseid).HasName("workoutcourse_pkey");

            entity.ToTable("workoutcourse");

            entity.Property(e => e.Courseid)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("courseid");
            entity.Property(e => e.Coursename)
                .HasMaxLength(50)
                .HasColumnName("coursename");
            entity.Property(e => e.Description)
                .HasMaxLength(256)
                .HasColumnName("description");
            entity.Property(e => e.Durationweek).HasColumnName("durationweek");
            entity.Property(e => e.Imageurl).HasColumnName("imageurl");
            entity.Property(e => e.Personaltrainer).HasColumnName("personaltrainer");

            entity.HasOne(d => d.PersonaltrainerNavigation).WithMany(p => p.Workoutcourses)
                .HasForeignKey(d => d.Personaltrainer)
                .HasConstraintName("workoutcourse_customertrainer_fkey");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
