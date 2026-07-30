export type SimulationStatus = "idle" | "running" | "paused" | "failed" | "completed";

export type SimulationLogEntry = {
  id: string;
  stepId: string;
  sequence: number;
  kind: "event" | "failure" | "fallback";
};

export type SimulationState = {
  status: SimulationStatus;
  stepIndex: number;
  autoRun: boolean;
  elapsedMs: number;
  logs: SimulationLogEntry[];
  failureInjected: boolean;
};

export type SimulationAction =
  | { type: "start"; stepId: string }
  | { type: "advance"; stepId: string; completed: boolean; durationMs: number }
  | { type: "pause" }
  | { type: "resume" }
  | { type: "set-auto"; enabled: boolean }
  | { type: "fail"; stepId: string }
  | { type: "recover"; stepId: string; stepIndex: number; durationMs: number }
  | { type: "reset" };

export const initialSimulationState: SimulationState = {
  status: "idle",
  stepIndex: -1,
  autoRun: false,
  elapsedMs: 0,
  logs: [],
  failureInjected: false,
};

function appendLog(
  state: SimulationState,
  stepId: string,
  kind: SimulationLogEntry["kind"],
): SimulationLogEntry[] {
  return [
    ...state.logs,
    {
      id: `${kind}-${stepId}-${state.logs.length + 1}`,
      stepId,
      sequence: state.logs.length + 1,
      kind,
    },
  ];
}

export function simulationReducer(
  state: SimulationState,
  action: SimulationAction,
): SimulationState {
  switch (action.type) {
    case "start":
      if (state.status !== "idle") return state;
      return {
        ...state,
        status: "running",
        stepIndex: 0,
        logs: appendLog(state, action.stepId, "event"),
      };
    case "advance":
      if (state.status !== "running") return state;
      return {
        ...state,
        status: action.completed ? "completed" : "running",
        stepIndex: state.stepIndex + 1,
        elapsedMs: state.elapsedMs + action.durationMs,
        logs: appendLog(state, action.stepId, "event"),
        autoRun: action.completed ? false : state.autoRun,
      };
    case "pause":
      return state.status === "running" ? { ...state, status: "paused" } : state;
    case "resume":
      return state.status === "paused" ? { ...state, status: "running" } : state;
    case "set-auto":
      return { ...state, autoRun: action.enabled };
    case "fail":
      if (state.status !== "running") return state;
      return {
        ...state,
        status: "failed",
        autoRun: false,
        failureInjected: true,
        logs: appendLog(state, action.stepId, "failure"),
      };
    case "recover":
      if (state.status !== "failed") return state;
      return {
        ...state,
        status: "running",
        stepIndex: action.stepIndex,
        elapsedMs: state.elapsedMs + action.durationMs,
        logs: appendLog(state, action.stepId, "fallback"),
      };
    case "reset":
      return initialSimulationState;
  }
}
