export type RoomSummary = {
    totalUnits: number;
    availableRooms: number;
    occupiedRooms: number;
    inMaintenance: number;
};

export interface Room {
    id?: number;
    floor?: number | null;
    number: string;
    sizeSqM?: number | null;
    monthlyRent: number;
    deposit: number;
    status?: 'VACANT' | 'OCCUPIED' | 'MAINTENANCE';
}

