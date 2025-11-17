/**
 * McMaster University Buildings Database
 * For address autocomplete
 */

export interface Building {
  name: string
  address: string
  shortName?: string
}

export const MCMASTER_BUILDINGS: Building[] = [
  {
    name: "Health Sciences Library",
    address: "1280 Main St W, Hamilton, ON L8S 4L8",
    shortName: "HSL",
  },
  {
    name: "Mills Memorial Library",
    address: "1280 Main St W, Hamilton, ON L8S 4K1",
    shortName: "Mills",
  },
  {
    name: "Engineering Building",
    address: "1280 Main St W, Hamilton, ON L8S 4L7",
    shortName: "JHE",
  },
  {
    name: "Togo Salmon Hall",
    address: "1280 Main St W, Hamilton, ON L8S 4L8",
    shortName: "Togo",
  },
  {
    name: "Student Center",
    address: "1280 Main St W, Hamilton, ON L8S 4S4",
    shortName: "MUSC",
  },
  {
    name: "Burke Science Building",
    address: "1280 Main St W, Hamilton, ON L8S 4K1",
    shortName: "BSB",
  },
  {
    name: "Kenneth Taylor Hall",
    address: "1280 Main St W, Hamilton, ON L8S 4M2",
    shortName: "KTH",
  },
  {
    name: "Life Sciences Building",
    address: "1280 Main St W, Hamilton, ON L8S 4K1",
    shortName: "LSB",
  },
  {
    name: "Thode Library",
    address: "1280 Main St W, Hamilton, ON L8S 4K1",
    shortName: "Thode",
  },
  {
    name: "Gilmour Hall",
    address: "1280 Main St W, Hamilton, ON L8S 4K1",
    shortName: "GH",
  },
  {
    name: "DeGroote School of Business",
    address: "1280 Main St W, Hamilton, ON L8S 4M4",
    shortName: "DSB",
  },
  {
    name: "Commons Building",
    address: "1280 Main St W, Hamilton, ON L8S 4K1",
  },
  {
    name: "Psychology Building",
    address: "1280 Main St W, Hamilton, ON L8S 4K1",
    shortName: "PC",
  },
  {
    name: "Ivor Wynne Centre",
    address: "1280 Main St W, Hamilton, ON L8S 4K1",
    shortName: "IWC",
  },
  {
    name: "Hedden Hall",
    address: "1280 Main St W, Hamilton, ON L8S 4K1",
  },
  {
    name: "Centre for Continuing Education",
    address: "1280 Main St W, Hamilton, ON L8S 4K1",
    shortName: "CCE",
  },
]

export function searchBuildings(query: string): Building[] {
  if (!query.trim()) return []
  
  const lowerQuery = query.toLowerCase()
  return MCMASTER_BUILDINGS.filter(
    (b) =>
      b.name.toLowerCase().includes(lowerQuery) ||
      b.shortName?.toLowerCase().includes(lowerQuery) ||
      b.address.toLowerCase().includes(lowerQuery)
  ).slice(0, 5) // Return top 5 matches
}

