import { NextApiRequest, NextApiResponse } from "next";

export const paises =
[
  {
    "value": "Afeganistão",
    "id": "AFG",
  },
  {
    "value": "África do Sul",
    "id": "ZAF",
  },
  {
    "value": "Albânia",
    "id": "ALB",
  },
  {
    "value": "Alemanha",
    "id": "DEU",
  },
  {
    "value": "Andorra",
    "id": "AND",
  },
  {
    "value": "Angola",
    "id": "AGO",
  },
  {
    "value": "Anguilla",
    "id": "AIA",
  },
  {
    "value": "Antártida",
    "id": "ATA",
  },
  {
    "value": "Antígua e Barbuda",
    "id": "ATG",
  },
  {
    "value": "Antilhas Holandesas",
    "id": "ANT",
  },
  {
    "value": "Arábia Saudita",
    "id": "SAU",
  },
  {
    "value": "Argélia",
    "id": "DZA",
  },
  {
    "value": "Argentina",
    "id": "ARG",
  },
  {
    "value": "Armênia",
    "id": "ARM",
  },
  {
    "value": "Aruba",
    "id": "ABW",
  },
  {
    "value": "Austrália",
    "id": "AUS",
  },
  {
    "value": "Áustria",
    "id": "AUT",
  },
  {
    "value": "Azerbaijão",
    "id": "AZE",
  },
  {
    "value": "Bahamas",
    "id": "BHS",
  },
  {
    "value": "Bahrein",
    "id": "BHR",
  },
  {
    "value": "Bangladesh",
    "id": "BGD",
  },
  {
    "value": "Barbados",
    "id": "BRB",
  },
  {
    "value": "Belarus",
    "id": "BLR",
  },
  {
    "value": "Bélgica",
    "id": "BEL",
  },
  {
    "value": "Belize",
    "id": "BLZ",
  },
  {
    "value": "Benin",
    "id": "BEN",
  },
  {
    "value": "Bermudas",
    "id": "BMU",
  },
  {
    "value": "Bolívia",
    "id": "BOL",
  },
  {
    "value": "Bósnia-Herzegóvina",
    "id": "BIH",
  },
  {
    "value": "Botsuana",
    "id": "BWA",
  },
  {
    "value": "Brasil",
    "id": "BRA",
  },
  {
    "value": "Brunei",
    "id": "BRN",
  },
  {
    "value": "Bulgária",
    "id": "BGR",
  },
  {
    "value": "Burkina Fasso",
    "id": "BFA",
  },
  {
    "value": "Burundi",
    "id": "BDI",
  },
  {
    "value": "Butão",
    "id": "BTN",
  },
  {
    "value": "Cabo Verde",
    "id": "CPV",
  },
  {
    "value": "Camarões",
    "id": "CMR",
  },
  {
    "value": "Camboja",
    "id": "KHM",
  },
  {
    "value": "Canadá",
    "id": "CAN",
  },
  {
    "value": "Cazaquistão",
    "id": "KAZ",
  },
  {
    "value": "Chade",
    "id": "TCD",
  },
  {
    "value": "Chile",
    "id": "CHL",
  },
  {
    "value": "China",
    "id": "CHN",
  },
  {
    "value": "Chipre",
    "id": "CYP",
  },
  {
    "value": "Cingapura",
    "id": "SGP",
  },
  {
    "value": "Colômbia",
    "id": "COL",
  },
  {
    "value": "Congo",
    "id": "COG",
  },
  {
    "value": "Coréia do Norte",
    "id": "PRK",
  },
  {
    "value": "Coréia do Sul",
    "id": "KOR",
  },
  {
    "value": "Costa do Marfim",
    "id": "CIV",
  },
  {
    "value": "Costa Rica",
    "id": "CRI",
  },
  {
    "value": "Croácia (Hrvatska)",
    "id": "HRV",
  },
  {
    "value": "Cuba",
    "id": "CUB",
  },
  {
    "value": "Dinamarca",
    "id": "DNK",
  },
  {
    "value": "Djibuti",
    "id": "DJI",
  },
  {
    "value": "Dominica",
    "id": "DMA",
  },
  {
    "value": "Egito",
    "id": "EGY",
  },
  {
    "value": "El Salvador",
    "id": "SLV",
  },
  {
    "value": "Emirados Árabes Unidos",
    "id": "ARE",
  },
  {
    "value": "Equador",
    "id": "ECU",
  },
  {
    "value": "Eritréia",
    "id": "ERI",
  },
  {
    "value": "Eslováquia",
    "id": "SVK",
  },
  {
    "value": "Eslovênia",
    "id": "SVN",
  },
  {
    "value": "Espanha",
    "id": "ESP",
  },
  {
    "value": "Estados Unidos",
    "id": "USA",
  },
  {
    "value": "Estônia",
    "id": "EST",
  },
  {
    "value": "Etiópia",
    "id": "ETH",
  },
  {
    "value": "Fiji",
    "id": "FJI",
  },
  {
    "value": "Filipinas",
    "id": "PHL",
  },
  {
    "value": "Finlândia",
    "id": "FIN",
  },
  {
    "value": "França",
    "id": "FRA",
  },
  {
    "value": "Gabão",
    "id": "GAB",
  },
  {
    "value": "Gâmbia",
    "id": "GMB",
  },
  {
    "value": "Gana",
    "id": "GHA",
  },
  {
    "value": "Geórgia",
    "id": "GEO",
  },
  {
    "value": "Gibraltar",
    "id": "GIB",
  },
  {
    "value": "Grã-Bretanha (Reino Unido, UK)",
    "id": "GBR",
  },
  {
    "value": "Granada",
    "id": "GRD",
  },
  {
    "value": "Grécia",
    "id": "GRC",
  },
  {
    "value": "Groelândia",
    "id": "GRL",
  },
  {
    "value": "Guadalupe",
    "id": "GLP",
  },
  {
    "value": "Guam (Território dos Estados Unidos)",
    "id": "GUM",
  },
  {
    "value": "Guatemala",
    "id": "GTM",
  },
  {
    "value": "Guernsey",
    "id": "GGY",
  },
  {
    "value": "Guiana",
    "id": "GUY",
  },
  {
    "value": "Guiana Francesa",
    "id": "GUF",
  },
  {
    "value": "Guiné",
    "id": "GIN",
  },
  {
    "value": "Guiné Equatorial",
    "id": "GNQ",
  },
  {
    "value": "Guiné-Bissau",
    "id": "GNB",
  },
  {
    "value": "Haiti",
    "id": "HTI",
  },
  {
    "value": "Holanda",
    "id": "NLD",
  },
  {
    "value": "Honduras",
    "id": "HND",
  },
  {
    "value": "Hong Kong",
    "id": "HKG",
  },
  {
    "value": "Hungria",
    "id": "HUN",
  },
  {
    "value": "Iêmen",
    "id": "YEM",
  },
  {
    "value": "Ilha Bouvet (Território da Noruega)",
    "id": "BVT",
  },
  {
    "value": "Ilha do Homem",
    "id": "IMN",
  },
  {
    "value": "Ilha Natal",
    "id": "CXR",
  },
  {
    "value": "Ilha Pitcairn",
    "id": "PCN",
  },
  {
    "value": "Ilha Reunião",
    "id": "REU",
  },
  {
    "value": "Ilhas Aland",
    "id": "ALA",
  },
  {
    "value": "Ilhas Cayman",
    "id": "CYM",
  },
  {
    "value": "Ilhas Cocos",
    "id": "CCK",
  },
  {
    "value": "Ilhas Comores",
    "id": "COM",
  },
  {
    "value": "Ilhas Cook",
    "id": "COK",
  },
  {
    "value": "Ilhas Faroes",
    "id": "FRO",
  },
  {
    "value": "Ilhas Falkland (Malvinas)",
    "id": "FLK",
  },
  {
    "value": "Ilhas Geórgia do Sul e Sandwich do Sul",
    "id": "SGS",
  },
  {
    "value": "Ilhas Heard e McDonald (Território da Austrália)",
    "id": "HMD",
  },
  {
    "value": "Ilhas Marianas do Norte",
    "id": "MNP",
  },
  {
    "value": "Ilhas Marshall",
    "id": "MHL",
  },
  {
    "value": "Ilhas Menores dos Estados Unidos",
    "id": "UMI",
  },
  {
    "value": "Ilhas Norfolk",
    "id": "NFK",
  },
  {
    "value": "Ilhas Seychelles",
    "id": "SYC",
  },
  {
    "value": "Ilhas Solomão",
    "id": "SLB",
  },
  {
    "value": "Ilhas Svalbard e Jan Mayen",
    "id": "SJM",
  },
  {
    "value": "Ilhas Tokelau",
    "id": "TKL",
  },
  {
    "value": "Ilhas Turks e Caicos",
    "id": "TCA",
  },
  {
    "value": "Ilhas Virgens (Estados Unidos)",
    "id": "VIR",
  },
  {
    "value": "Ilhas Virgens (Inglaterra)",
    "id": "VGB",
  },
  {
    "value": "Ilhas Wallis e Futuna",
    "id": "WLF",
  },
  {
    "value": "índia",
    "id": "IND",
  },
  {
    "value": "Indonésia",
    "id": "IDN",
  },
  {
    "value": "Irã",
    "id": "IRN",
  },
  {
    "value": "Iraque",
    "id": "IRQ",
  },
  {
    "value": "Irlanda",
    "id": "IRL",
  },
  {
    "value": "Islândia",
    "id": "ISL",
  },
  {
    "value": "Israel",
    "id": "ISR",
  },
  {
    "value": "Itália",
    "id": "ITA",
  },
  {
    "value": "Jamaica",
    "id": "JAM",
  },
  {
    "value": "Japão",
    "id": "JPN",
  },
  {
    "value": "Jersey",
    "id": "JEY",
  },
  {
    "value": "Jordânia",
    "id": "JOR",
  },
  {
    "value": "Kênia",
    "id": "KEN",
  },
  {
    "value": "Kiribati",
    "id": "KIR",
  },
  {
    "value": "Kuait",
    "id": "KWT",
  },
  {
    "value": "Laos",
    "id": "LAO",
  },
  {
    "value": "Látvia",
    "id": "LVA",
  },
  {
    "value": "Lesoto",
    "id": "LSO",
  },
  {
    "value": "Líbano",
    "id": "LBN",
  },
  {
    "value": "Libéria",
    "id": "LBR",
  },
  {
    "value": "Líbia",
    "id": "LBY",
  },
  {
    "value": "Liechtenstein",
    "id": "LIE",
  },
  {
    "value": "Lituânia",
    "id": "LTU",
  },
  {
    "value": "Luxemburgo",
    "id": "LUX",
  },
  {
    "value": "Macau",
    "id": "MAC",
  },
  {
    "value": "Macedônia (República Yugoslava)",
    "id": "MKD",
  },
  {
    "value": "Madagascar",
    "id": "MDG",
  },
  {
    "value": "Malásia",
    "id": "MYS",
  },
  {
    "value": "Malaui",
    "id": "MWI",
  },
  {
    "value": "Maldivas",
    "id": "MDV",
  },
  {
    "value": "Mali",
    "id": "MLI",
  },
  {
    "value": "Malta",
    "id": "MLT",
  },
  {
    "value": "Marrocos",
    "id": "MAR",
  },
  {
    "value": "Martinica",
    "id": "MTQ",
  },
  {
    "value": "Maurício",
    "id": "MUS",
  },
  {
    "value": "Mauritânia",
    "id": "MRT",
  },
  {
    "value": "Mayotte",
    "id": "MYT",
  },
  {
    "value": "México",
    "id": "MEX",
  },
  {
    "value": "Micronésia",
    "id": "FSM",
  },
  {
    "value": "Moçambique",
    "id": "MOZ",
  },
  {
    "value": "Moldova",
    "id": "MDA",
  },
  {
    "value": "Mônaco",
    "id": "MCO",
  },
  {
    "value": "Mongólia",
    "id": "MNG",
  },
  {
    "value": "Montenegro",
    "id": "MNE",
  },
  {
    "value": "Montserrat",
    "id": "MSR",
  },
  {
    "value": "Myanma",
    "id": "MMR",
  },
  {
    "value": "Namíbia",
    "id": "NAM",
  },
  {
    "value": "Nauru",
    "id": "NRU",
  },
  {
    "value": "Nepal",
    "id": "NPL",
  },
  {
    "value": "Nicarágua",
    "id": "NIC",
  },
  {
    "value": "Níger",
    "id": "NER",
  },
  {
    "value": "Nigéria",
    "id": "NGA",
  },
  {
    "value": "Niue",
    "id": "NIU",
  },
  {
    "value": "Noruega",
    "id": "NOR",
  },
  {
    "value": "Nova Caledônia",
    "id": "NCL",
  },
  {
    "value": "Nova Zelândia",
    "id": "NZL",
  },
  {
    "value": "Omã",
    "id": "OMN",
  },
  {
    "value": "Palau",
    "id": "PLW",
  },
  {
    "value": "Panamá",
    "id": "PAN",
  },
  {
    "value": "Papua-Nova Guiné",
    "id": "PNG",
  },
  {
    "value": "Paquistão",
    "id": "PAK",
  },
  {
    "value": "Paraguai",
    "id": "PRY",
  },
  {
    "value": "Peru",
    "id": "PER",
  },
  {
    "value": "Polinésia Francesa",
    "id": "PYF",
  },
  {
    "value": "Polônia",
    "id": "POL",
  },
  {
    "value": "Porto Rico",
    "id": "PRI",
  },
  {
    "value": "Portugal",
    "id": "PRT",
  },
  {
    "value": "Qatar",
    "id": "QAT",
  },
  {
    "value": "Quirguistão",
    "id": "KGZ",
  },
  {
    "value": "República Centro-Africana",
    "id": "CAF",
  },
  {
    "value": "República Democrática do Congo",
    "id": "COD",
  },
  {
    "value": "República Dominicana",
    "id": "DOM",
  },
  {
    "value": "República Tcheca",
    "id": "CZE",
  },
  {
    "value": "Romênia",
    "id": "ROM",
  },
  {
    "value": "Ruanda",
    "id": "RWA",
  },
  {
    "value": "Rússia (antiga URSS) - Federação Russa",
    "id": "RUS",
  },
  {
    "value": "Saara Ocidental",
    "id": "ESH",
  },
  {
    "value": "Saint Vincente e Granadinas",
    "id": "VCT",
  },
  {
    "value": "Samoa Americana",
    "id": "ASM",
  },
  {
    "value": "Samoa Ocidental",
    "id": "WSM",
  },
  {
    "value": "San Marino",
    "id": "SMR",
  },
  {
    "value": "Santa Helena",
    "id": "SHN",
  },
  {
    "value": "Santa Lúcia",
    "id": "LCA",
  },
  {
    "value": "São Bartolomeu",
    "id": "BLM",
  },
  {
    "value": "São Cristóvão e Névis",
    "id": "KNA",
  },
  {
    "value": "São Martim",
    "id": "MAF",
  },
  {
    "value": "São Tomé e Príncipe",
    "id": "STP",
  },
  {
    "value": "Senegal",
    "id": "SEN",
  },
  {
    "value": "Serra Leoa",
    "id": "SLE",
  },
  {
    "value": "Sérvia",
    "id": "SRB",
  },
  {
    "value": "Síria",
    "id": "SYR",
  },
  {
    "value": "Somália",
    "id": "SOM",
  },
  {
    "value": "Sri Lanka",
    "id": "LKA",
  },
  {
    "value": "St. Pierre and Miquelon",
    "id": "SPM",
  },
  {
    "value": "Suazilândia",
    "id": "SWZ",
  },
  {
    "value": "Sudão",
    "id": "SDN",
  },
  {
    "value": "Suécia",
    "id": "SWE",
  },
  {
    "value": "Suíça",
    "id": "CHE",
  },
  {
    "value": "Suriname",
    "id": "SUR",
  },
  {
    "value": "Tadjiquistão",
    "id": "TJK",
  },
  {
    "value": "Tailândia",
    "id": "THA",
  },
  {
    "value": "Taiwan",
    "id": "TWN",
  },
  {
    "value": "Tanzânia",
    "id": "TZA",
  },
  {
    "value": "Território Britânico do Oceano índico",
    "id": "IOT",
  },
  {
    "value": "Territórios do Sul da França",
    "id": "ATF",
  },
  {
    "value": "Territórios Palestinos Ocupados",
    "id": "PSE",
  },
  {
    "value": "Timor Leste",
    "id": "TMP",
  },
  {
    "value": "Togo",
    "id": "TGO",
  },
  {
    "value": "Tonga",
    "id": "TON",
  },
  {
    "value": "Trinidad and Tobago",
    "id": "TTO",
  },
  {
    "value": "Tunísia",
    "id": "TUN",
  },
  {
    "value": "Turcomenistão",
    "id": "TKM",
  },
  {
    "value": "Turquia",
    "id": "TUR",
  },
  {
    "value": "Tuvalu",
    "id": "TUV",
  },
  {
    "value": "Ucrânia",
    "id": "UKR",
  },
  {
    "value": "Uganda",
    "id": "UGA",
  },
  {
    "value": "Uruguai",
    "id": "URY",
  },
  {
    "value": "Uzbequistão",
    "id": "UZB",
  },
  {
    "value": "Vanuatu",
    "id": "VUT",
  },
  {
    "value": "Vaticano",
    "id": "VAT",
  },
  {
    "value": "Venezuela",
    "id": "VEN",
  },
  {
    "value": "Vietnã",
    "id": "VNM",
  },
  {
    "value": "Zâmbia",
    "id": "ZMB",
  },
  {
    "value": "Zimbábue",
    "id": "ZWE",
  }
]
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(paises)
}