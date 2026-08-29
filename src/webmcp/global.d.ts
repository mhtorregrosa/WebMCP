export {}

type WebMCPTool = {
  name: string
  title?: string
  description: string
  inputSchema: Record<string, unknown>
  annotations?: { readOnlyHint?: boolean; untrustedContentHint?: boolean }
  execute: (input: any, context?: { signal?: AbortSignal }) => Promise<string> | string
}

declare global {
  interface Document {
    modelContext?: {
      registerTool: (tool: WebMCPTool, options?: { signal?: AbortSignal }) => Promise<void>
    }
  }
}
