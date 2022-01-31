using Microsoft.EntityFrameworkCore.Migrations;
using MySql.Data.EntityFrameworkCore.Metadata;

namespace WebAPI.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Answers",
                columns: table => new
                {
                    answersId = table.Column<int>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    regId = table.Column<int>(nullable: false),
                    answer1 = table.Column<int>(nullable: false),
                    answer2 = table.Column<int>(nullable: false),
                    answer3 = table.Column<int>(nullable: false),
                    answer4 = table.Column<int>(nullable: false),
                    answer5 = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answers", x => x.answersId);
                });

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    qId = table.Column<int>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    question = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    variant1 = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    variant2 = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    variant3 = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    answer = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.qId);
                });

            migrationBuilder.CreateTable(
                name: "Reg",
                columns: table => new
                {
                    regId = table.Column<int>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    name = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    surname = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    middlename = table.Column<string>(type: "nvarchar(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reg", x => x.regId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Answers");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "Reg");
        }
    }
}
