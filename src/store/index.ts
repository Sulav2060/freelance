import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Job {
  id: number;
  sector: string;
  details: string;
  deadline: string;
  status: "open" | "in_progress" | "completed" | "deadline_passed";
  fileUrl?: string;
  amount: number;
  bids?: Bid[];
  biddingDeadline: string;
}
interface Bid {
  id: number;
  freelancerId: number;
  amount: number;
  proposal: string;
}

interface AppState {
  isFreelancer: boolean;
  jobs: Job[];
  assignedJobs: Job[];
  credit: number;
  successMessage: string | null;
  loading: boolean;
}

const initialState: AppState = {
  isFreelancer: true,
  jobs: [
    {
      id: 1,
      sector: "Web Development",
      details: "Create a responsive website",
      amount: 500,
      status: "open",
      biddingDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 2,
      sector: "Web Development",
      details: "Create a responsive website",
      amount: 300,
      status: "open",
      biddingDeadline: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 3,
      sector: "Web Development",
      details: "Create a responsive website",
      amount: 200,
      status: "open",
      biddingDeadline: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 4,
      sector: "Web Development",
      details: "Create a responsive website",
      amount: 400,
      status: "deadline_passed",
      biddingDeadline: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
  ],
  assignedJobs: [],
  credit: 500,
  successMessage: null,
  loading: false,
};
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    switchMode: (state) => {
      state.isFreelancer = !state.isFreelancer;
    },
    setMode: (state, action: PayloadAction<boolean>) => {
      state.isFreelancer = action.payload;
    },
    addJob: (state, action: PayloadAction<Job>) => {
      state.jobs.push(action.payload);
    },
    acceptJob: (state, action: PayloadAction<number>) => {
      const jobIndex = state.jobs.findIndex((job) => job.id === action.payload);
      if (jobIndex !== -1) {
        const job = state.jobs[jobIndex];
        state.assignedJobs.push(job);
        state.jobs.splice(jobIndex, 1);
        state.successMessage = `Accepted job ${job.id}.`;
      }
    },
    updateJobStatus: (
      state,
      action: PayloadAction<{ jobId: number; status: Job["status"] }>
    ) => {
      const { jobId, status } = action.payload;
      const job = state.assignedJobs.find((job) => job.id === jobId);
      if (job) {
        job.status = status;
        state.successMessage = `Updated job ${jobId} status to ${status}.`;
      }
    },
    updateJob: (
      state,
      action: PayloadAction<{ id: number; status: Job["status"] }>
    ) => {
      const job = state.jobs.find((j) => j.id === action.payload.id);
      if (job) {
        job.status = action.payload.status;
        if (action.payload.status === "in_progress") {
          state.assignedJobs.push({ ...job });
          state.jobs = state.jobs.filter((j) => j.id !== action.payload.id);
        }
      }
    },
    removeJob: (state, action: PayloadAction<number>) => {
      state.jobs = state.jobs.filter((job) => job.id !== action.payload);
    },

    showBidDetails: (state, action: PayloadAction<number>) => {
      state.loading = true;
      state.successMessage = `Showing bids for job ${action.payload}`;
      state.loading = false;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    updateCredit: (state, action: PayloadAction<number>) => {
      state.credit = action.payload;
    },
    editAndRebidJob: (state, action: PayloadAction<number>) => {
      const job = state.jobs.find((j) => j.id === action.payload);
      if (job) {
        job.status = "open";
        job.biddingDeadline = new Date(
          Date.now() + 24 * 60 * 60 * 1000
        ).toISOString(); // Set new deadline to 24 hours from now
      }
    },
  },
});

export const {
  switchMode,
  setMode,
  addJob,
  acceptJob,
  updateJobStatus,
  clearSuccessMessage,
  updateCredit,
  showBidDetails,
  updateJob,
  removeJob,
  editAndRebidJob,
} = appSlice.actions;

export const store = configureStore({
  reducer: appSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
