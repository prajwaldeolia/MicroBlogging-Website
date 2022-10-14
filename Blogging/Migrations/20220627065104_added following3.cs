using Microsoft.EntityFrameworkCore.Migrations;

namespace Blogging.Migrations
{
    public partial class addedfollowing3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "following");

            migrationBuilder.DropColumn(
                name: "ImgPath",
                table: "following");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "following");

            migrationBuilder.AddColumn<int>(
                name: "Followingid",
                table: "following",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Followingid",
                table: "following");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "following",
                type: "nvarchar(200)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImgPath",
                table: "following",
                type: "nvarchar(100)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "following",
                type: "nvarchar(200)",
                nullable: true);
        }
    }
}
