export namespace CONFIG {
    let VERSION: string;
    let BUILD: string;
    namespace NEURAL_BRIDGE {
        let CRITICAL_FREQUENCY: number;
        let MAX_SUBJECTS: number;
        let MIN_SUBJECTS: number;
        let GOLDEN_RATIO: number;
        let PATTERN_THRESHOLD: number;
    }
    namespace TERMINAL {
        let BOOT_DELAY: number;
        let FLICKER_CHANCE: number;
        let FLICKER_INTERVAL: number;
        let MATRIX_CHARACTERS: number;
        let HISTORY_MAX: number;
    }
    namespace FILESYSTEM {
        let DEFAULT_PATH: string;
        let ROOT_PATH: string;
        let MAX_FILE_SIZE: number;
        namespace PERMISSIONS {
            let READ: string;
            let write: string;
            let execute: string;
        }
    }
    namespace UI {
        namespace COLORS {
            let primary: string;
            let warning: string;
            let error: string;
            let classified: string;
        }
        namespace FONTS {
            let mono: string;
            let size: string;
        }
    }
    let FEATURES: string[];
    namespace LAB {
        let name: string;
        let facility: string;
        let frequency: string;
        let status: string;
    }
}
export namespace MESSAGES {
    let BOOT_SEQUENCE: string[];
    let MYSTERIOUS_RESPONSES: string[];
    namespace WARNINGS {
        let CONSCIOUSNESS: string;
        let PATTERN: string;
        let CLASSIFIED: string;
    }
}
export default CONFIG;
//# sourceMappingURL=constants.d.ts.map