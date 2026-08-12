export type ViewMode = 'slide' | 'diagram' | 'comparison' | 'prototype' | 'article';

export type ThemeId = 'academic-blue' | 'print-monochrome' | 'dark-executive' | 'clinical-teal' | 'high-density';

export interface ArchModule {
  id: string;
  code: string; // e.g. "6.1.1"
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  isCore: boolean; // 6.1.2, 6.1.3, 6.1.4 are Core Engine
  citations: string[];
  features: string[];
  dataInputs: string[];
  dataOutputs: string[];
  patientImpact: string;
  doctorImpact: string;
  iconName: string;
  category: 'core' | 'interaction' | 'ai' | 'integration';
}

export interface FederatedLayer {
  id: string;
  level: 'organization' | 'regional' | 'patient';
  title: string;
  codeRef: string;
  description: string;
  process: string;
  dataFlow: string;
}

export interface AccessControlRule {
  id: string;
  role: string;
  scope: string;
  example: string;
  description: string;
}

export interface ReferenceItem {
  id: string;
  citation: string;
  authors: string;
  title: string;
  year: string;
  link?: string;
}

export interface ParadigmShiftItem {
  attribute: string;
  orgMIS: string;
  regionalMIS: string;
  patientMIS: string;
}
