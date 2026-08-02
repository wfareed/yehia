// Curated set of icons that admins can pick from when editing cards/stats.
// Keep this list in sync with whatever icons the public pages know how to render.
import {
  Rocket, Target, Eye, Heart, Users, Globe, Award, Calendar,
  GraduationCap, BookOpen, Home, Headphones, MapPin, Plane, FileText,
  CheckCircle, Star, Clock, Shield, TrendingUp, Briefcase, Phone, Mail,
  Landmark, Ship, Sparkles, Waves, Church, Palmtree, Building2,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

export const iconMap = {
  Rocket, Target, Eye, Heart, Users, Globe, Award, Calendar,
  GraduationCap, BookOpen, Home, Headphones, MapPin, Plane, FileText,
  CheckCircle, Star, Clock, Shield, TrendingUp, Briefcase, Phone, Mail,
  Landmark, Ship, Sparkles, Waves, Church, Palmtree, Building2,
} satisfies Record<string, LucideIcon>

export type IconName = keyof typeof iconMap
export const iconNames = Object.keys(iconMap) as IconName[]
