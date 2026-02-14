import type { EntityInfo, DemandCategory } from "@/engine/types";
import { energyCompanies } from "./energy-companies";
import { waterCompanies } from "./water-companies";
import { councils } from "./councils";
import { parkingCompanies } from "./parking-companies";
import { debtCollectors } from "./debt-collectors";

const entityRegistry: Partial<Record<DemandCategory, EntityInfo[]>> = {
  energy: energyCompanies,
  water: waterCompanies,
  "council-tax": councils,
  "council-parking": councils,
  "private-parking": parkingCompanies,
  "debt-collector": debtCollectors,
  bailiff: debtCollectors, // Many bailiff firms are the same as debt collectors
};

export function getEntitiesForCategory(category: DemandCategory): EntityInfo[] {
  return entityRegistry[category] || [];
}

export function searchEntities(
  category: DemandCategory,
  query: string
): EntityInfo[] {
  const entities = getEntitiesForCategory(category);
  if (!query.trim()) return entities;
  const lower = query.toLowerCase();
  return entities.filter((e) => e.name.toLowerCase().includes(lower));
}
