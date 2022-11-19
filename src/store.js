import create from "zustand";

const appStore = create((set) => ({
    // eslint-disable-next-line
    simulationData : {},
    clearSimulationData : () => set((state) => {simulationData : {}}),
}));

export default appStore;