using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Blogging.Migrations
{
    public partial class addeddate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "tweet",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Edited",
                table: "tweet",
                type: "nvarchar(10)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "tweet");

            migrationBuilder.DropColumn(
                name: "Edited",
                table: "tweet");
        }
    }
}
