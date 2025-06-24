"use client";

import React from "react";
import {
  Menu,
  Search,
  Upload,
  Settings,
  User,
  Bell,
  Home,
  LogOut,
  Eye,
  EyeOff,
  X,
  Zap,
  RefreshCw,
  FileText,
  Plus,
  Filter,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  Download,
  Info,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Calendar,
  Mail,
  BarChart,
  Edit,
  Layout,
  Crown,
  Bot,
  Key,
  Folder,
  Globe,
  PanelRightOpen,
  PanelLeftOpen,
  MessageSquarePlus,
  Play,
  Pause,
} from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
  menu: Menu,
  search: Search,
  upload: Upload,
  settings: Settings,
  user: User,
  bell: Bell,
  home: Home,
  signOut: LogOut,
  eye: Eye,
  eyeOff: EyeOff,
  x: X,
  zap: Zap,
  refresh: RefreshCw,
  file: FileText,
  plus: Plus,
  filter: Filter,
  chevronUp: ChevronUp,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  check: Check,
  download: Download,
  info: Info,
  alertTriangle: AlertTriangle,
  alertCircle: AlertCircle,
  checkCircle: CheckCircle,
  trendingUp: TrendingUp,
  calendar: Calendar,
  mail: Mail,
  barChart: BarChart,
  edit: Edit,
  layout: Layout,
  crown: Crown,
  bot: Bot,
  key: Key,
  folder: Folder,
  globe: Globe,
  "panel-right-open": PanelRightOpen,
  "panel-left-open": PanelLeftOpen,
  "message-square-plus": MessageSquarePlus,
  play: Play,
  pause: Pause,
};

interface IconProps {
  name: keyof typeof icons;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Icon({ name, size = "md", className }: IconProps) {
  const IconComponent = icons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  const sizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8",
  };

  return <IconComponent className={cn(sizes[size], className)} />;
}