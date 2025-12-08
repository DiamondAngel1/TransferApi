using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Domain.Migrations
{
    /// <inheritdoc />
    public partial class addtblTransportations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_city_tbl_Countries_CountryId",
                table: "tbl_city");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tbl_city",
                table: "tbl_city");

            migrationBuilder.RenameTable(
                name: "tbl_city",
                newName: "tblCities");

            migrationBuilder.RenameIndex(
                name: "IX_tbl_city_CountryId",
                table: "tblCities",
                newName: "IX_tblCities_CountryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblCities",
                table: "tblCities",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "tblTransportationStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblTransportationStatuses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblTransportations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Code = table.Column<string>(type: "text", nullable: false),
                    FromCityId = table.Column<int>(type: "integer", nullable: false),
                    ToCityId = table.Column<int>(type: "integer", nullable: false),
                    DepartureTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ArrivalTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    SeatsTotal = table.Column<int>(type: "integer", nullable: false),
                    SeatsAvailable = table.Column<int>(type: "integer", nullable: false),
                    StatusId = table.Column<int>(type: "integer", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblTransportations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblTransportations_tblCities_FromCityId",
                        column: x => x.FromCityId,
                        principalTable: "tblCities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tblTransportations_tblCities_ToCityId",
                        column: x => x.ToCityId,
                        principalTable: "tblCities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tblTransportations_tblTransportationStatuses_StatusId",
                        column: x => x.StatusId,
                        principalTable: "tblTransportationStatuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblTransportations_FromCityId",
                table: "tblTransportations",
                column: "FromCityId");

            migrationBuilder.CreateIndex(
                name: "IX_tblTransportations_StatusId",
                table: "tblTransportations",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_tblTransportations_ToCityId",
                table: "tblTransportations",
                column: "ToCityId");

            migrationBuilder.AddForeignKey(
                name: "FK_tblCities_tbl_Countries_CountryId",
                table: "tblCities",
                column: "CountryId",
                principalTable: "tbl_Countries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblCities_tbl_Countries_CountryId",
                table: "tblCities");

            migrationBuilder.DropTable(
                name: "tblTransportations");

            migrationBuilder.DropTable(
                name: "tblTransportationStatuses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tblCities",
                table: "tblCities");

            migrationBuilder.RenameTable(
                name: "tblCities",
                newName: "tbl_city");

            migrationBuilder.RenameIndex(
                name: "IX_tblCities_CountryId",
                table: "tbl_city",
                newName: "IX_tbl_city_CountryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tbl_city",
                table: "tbl_city",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_city_tbl_Countries_CountryId",
                table: "tbl_city",
                column: "CountryId",
                principalTable: "tbl_Countries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
