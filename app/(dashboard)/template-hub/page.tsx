"use client";

import React, { useState } from "react";
import { TemplateCard } from "@/components/ui/template-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

const mockTemplates = [
  {
    title: "Sales Outreach",
    description: "A template for reaching out to new sales leads.",
    author: "By Convergence",
    isPro: false,
    icon: "briefcase",
  },
  {
    title: "Marketing Campaign",
    description: "A comprehensive template for planning a marketing campaign.",
    author: "By Convergence",
    isPro: true,
    icon: "megaphone",
  },
  {
    title: "Data Entry Automation",
    description: "Automate your data entry tasks with this template.",
    author: "By Convergence",
    isPro: false,
    icon: "database",
  },
  {
    title: "Customer Support",
    description: "A template for handling customer support inquiries.",
    author: "By Convergence",
    isPro: false,
    icon: "users",
  },
  {
    title: "Social Media Plan",
    description: "Plan your social media content with this template.",
    author: "By Convergence",
    isPro: true,
    icon: "thumbs-up",
  },
  {
    title: "Content Creation",
    description: "A template for managing your content creation workflow.",
    author: "By Convergence",
    isPro: false,
    icon: "file-text",
  },
];

const categories = ["All", "Sales", "Marketing", "Data Entry"];

export default function TemplateHubPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTemplates = mockTemplates.filter((template) => {
    const matchesCategory =
      selectedCategory === "All" || template.title.includes(selectedCategory);
    const matchesSearch = template.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-foreground">
            Template Hub
          </h1>
          <p className="text-muted-foreground">
            Discover and use templates to automate your work.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-grow">
            <Icon
              name="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="search"
              placeholder="Search for templates..."
              className="w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template, index) => (
          <TemplateCard
            key={index}
            title={template.title}
            description={template.description}
            author={template.author}
            isPro={template.isPro}
            icon={template.icon}
            onClick={() => {}}
          />
        ))}
      </div>
    </div>
  );
}