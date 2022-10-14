using Microsoft.EntityFrameworkCore.Migrations;

namespace Blogging.Migrations
{
    public partial class rmfromtweet1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "tweet");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "tweet");

            migrationBuilder.AlterColumn<string>(
                name: "username",
                table: "tweet",
                type: "nvarchar(240)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "username",
                table: "tweet",
                type: "nvarchar(100)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(240)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "tweet",
                type: "nvarchar(240)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "tweet",
                type: "nvarchar(100)",
                nullable: true);
        }
    }
}
