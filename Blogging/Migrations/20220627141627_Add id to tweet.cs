using Microsoft.EntityFrameworkCore.Migrations;

namespace Blogging.Migrations
{
    public partial class Addidtotweet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "email",
                table: "tweet");

            migrationBuilder.AddColumn<int>(
                name: "Userid",
                table: "tweet",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Userid",
                table: "tweet");

            migrationBuilder.AddColumn<string>(
                name: "email",
                table: "tweet",
                type: "nvarchar(200)",
                nullable: true);
        }
    }
}
