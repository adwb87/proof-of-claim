"use client";

import { useState, useMemo, useEffect } from "react";
import { useFlow } from "@/engine/context/FlowContext";
import { getEntitiesForCategory } from "@/engine/data/entities";
import type { DemandCategory, EntityInfo } from "@/engine/types";

/** Quick-select entities for categories without entity data files */
const FALLBACK_ENTITIES: Partial<Record<DemandCategory, EntityInfo[]>> = {
  "tv-licence": [{ name: "TV Licensing (BBC)", address: "TV Licensing, Darlington, DL98 1TL" }],
  hmrc: [{ name: "HMRC", address: "HM Revenue and Customs, BX9 1AS" }],
  speeding: [],
  other: [],
};

export function EntitySelector() {
  const { state, setEntity } = useFlow();
  const [searchTerm, setSearchTerm] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customName, setCustomName] = useState("");

  const category = state.category;
  const isCouncilCategory = category === "speeding";

  // All hooks must be called before any conditional returns
  const entities: EntityInfo[] = useMemo(() => {
    if (!category) return [];
    const fromRegistry = getEntitiesForCategory(category);
    if (fromRegistry.length > 0) return fromRegistry;
    return FALLBACK_ENTITIES[category] || [];
  }, [category]);

  const filteredEntities = useMemo(() => {
    if (!searchTerm.trim()) return entities;
    const lower = searchTerm.toLowerCase();
    return entities.filter((e) => e.name.toLowerCase().includes(lower));
  }, [entities, searchTerm]);

  // Auto-set entity for TV Licence and HMRC — skip entity selector entirely
  useEffect(() => {
    if (category === "tv-licence") {
      setEntity({
        name: "TV Licensing (BBC)",
        address: "TV Licensing, Darlington, DL98 1TL",
      });
    } else if (category === "hmrc") {
      setEntity({
        name: "HMRC",
        address: "HM Revenue and Customs, BX9 1AS",
      });
    }
  }, [category, setEntity]);

  // Return null while auto-setting (TV Licence and HMRC)
  if (category === "tv-licence" || category === "hmrc") {
    return null;
  }

  const handleSelect = (entity: EntityInfo) => {
    setEntity(entity);
  };

  const handleCustomSubmit = () => {
    if (customName.trim()) {
      setEntity({ name: customName.trim() });
    }
  };

  // Council tax and similar categories: show text input directly
  if (isCouncilCategory) {
    return (
      <div className="animate-fade-in-up">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
            Who sent you this demand?
          </h2>
          <p className="text-text-secondary">
            Enter the police force or authority name
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="e.g. West Midlands Police"
            className="w-full rounded-xl p-4 text-lg border-2 border-border bg-surface text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none transition-colors"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCustomSubmit();
            }}
          />

          <button
            onClick={handleCustomSubmit}
            disabled={!customName.trim()}
            className="w-full min-h-[56px] rounded-xl p-4 px-6 bg-primary text-white text-lg font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary-light transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
          Who sent you this demand?
        </h2>
        <p className="text-text-secondary">
          Search or pick from common choices below.
        </p>
      </div>

      {/* Search input */}
      <div className="relative mb-6">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a company..."
          className="w-full rounded-xl p-4 pl-12 text-lg border-2 border-border bg-surface text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none transition-colors"
          autoFocus
        />
      </div>

      {/* Common choices */}
      {!showCustomInput && (
        <>
          {filteredEntities.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-text-secondary mb-3 uppercase tracking-wider">
                Common choices
              </p>
              <div className="space-y-2">
                {filteredEntities.map((entity, index) => (
                  <button
                    key={entity.name}
                    onClick={() => handleSelect(entity)}
                    className="opacity-0 animate-fade-in-up w-full min-h-[52px] rounded-xl p-4 px-5 bg-surface border border-border text-text-primary text-lg text-left hover:border-primary hover:bg-primary/5 transition-all duration-200"
                    style={{
                      animationDelay: `${index * 40}ms`,
                      animationFillMode: "forwards",
                    }}
                  >
                    {entity.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {searchTerm && filteredEntities.length === 0 && (
            <p className="text-center text-text-secondary mb-4 py-4">
              No matches found. Use the button below to enter the name manually.
            </p>
          )}

          {/* Other / Not Listed — hidden for council-tax */}
          {category !== "council-tax" && (
            <button
              onClick={() => setShowCustomInput(true)}
              className="w-full min-h-[52px] rounded-xl p-4 px-5 bg-background border-2 border-dashed border-border text-text-secondary text-lg text-center hover:border-primary hover:text-primary transition-all duration-200 mt-2"
            >
              Other / Not Listed
            </button>
          )}
        </>
      )}

      {/* Custom name input */}
      {showCustomInput && (
        <div className="space-y-4 animate-fade-in-up">
          <input
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="Enter company or organisation name"
            className="w-full rounded-xl p-4 text-lg border-2 border-border bg-surface text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none transition-colors"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCustomSubmit();
            }}
          />

          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowCustomInput(false);
                setCustomName("");
              }}
              className="flex-1 min-h-[52px] rounded-xl p-4 bg-surface border-2 border-border text-text-secondary text-lg font-medium hover:border-primary hover:text-primary transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleCustomSubmit}
              disabled={!customName.trim()}
              className="flex-1 min-h-[52px] rounded-xl p-4 bg-primary text-white text-lg font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary-light transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
