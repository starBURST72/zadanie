﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebAPI.Models;

namespace WebAPI.Migrations
{
    [DbContext(typeof(DonationDBContext))]
    [Migration("20220125124912_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("WebAPI.Models.Answers", b =>
                {
                    b.Property<int>("answersId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("answer1")
                        .HasColumnType("int");

                    b.Property<int>("answer2")
                        .HasColumnType("int");

                    b.Property<int>("answer3")
                        .HasColumnType("int");

                    b.Property<int>("answer4")
                        .HasColumnType("int");

                    b.Property<int>("answer5")
                        .HasColumnType("int");

                    b.Property<int>("regId")
                        .HasColumnType("int");

                    b.HasKey("answersId");

                    b.ToTable("Answers");
                });

            modelBuilder.Entity("WebAPI.Models.Questions", b =>
                {
                    b.Property<int>("qId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("answer")
                        .HasColumnType("int");

                    b.Property<string>("question")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("variant1")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("variant2")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("variant3")
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("qId");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("WebAPI.Models.Reg", b =>
                {
                    b.Property<int>("regId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("middlename")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("surname")
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("regId");

                    b.ToTable("Reg");
                });
#pragma warning restore 612, 618
        }
    }
}
