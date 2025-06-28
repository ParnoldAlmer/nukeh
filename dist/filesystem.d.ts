export const filesystem: {
    '/': {
        type: string;
        contents: {
            home: {
                type: string;
                contents: {
                    nukeh_admin: {
                        type: string;
                        contents: {
                            '.bash_history': {
                                type: string;
                                content: string;
                                permissions: string;
                                size: string;
                                modified: string;
                            };
                            '.neural_patterns': {
                                type: string;
                                content: string;
                                permissions: string;
                                size: string;
                                modified: string;
                            };
                            resonance_scan: {
                                type: string;
                                content: string;
                                permissions: string;
                                size: string;
                                modified: string;
                                executable: boolean;
                            };
                            'incident_7742.txt': {
                                type: string;
                                content: string;
                                permissions: string;
                                size: string;
                                modified: string;
                            };
                            'consciousness_matrix.log': {
                                type: string;
                                content: string;
                                permissions: string;
                                size: string;
                                modified: string;
                            };
                            'the_pattern.hex': {
                                type: string;
                                content: string;
                                permissions: string;
                                size: string;
                                modified: string;
                            };
                            emails: {
                                type: string;
                                contents: {
                                    sent: {
                                        type: string;
                                        contents: {
                                            'board_update.eml': {
                                                type: string;
                                                content: string;
                                                permissions: string;
                                                size: string;
                                                modified: string;
                                            };
                                        };
                                    };
                                    inbox: {
                                        type: string;
                                        contents: {
                                            'urgent_memo.eml': {
                                                type: string;
                                                content: string;
                                                permissions: string;
                                                size: string;
                                                modified: string;
                                            };
                                        };
                                    };
                                };
                            };
                            research: {
                                type: string;
                                contents: {
                                    papers: {
                                        type: string;
                                        contents: {
                                            'consciousness_topology.pdf': {
                                                type: string;
                                                content: string;
                                                permissions: string;
                                                size: string;
                                                modified: string;
                                            };
                                            'morphic_resonance_theory.pdf': {
                                                type: string;
                                                content: string;
                                                permissions: string;
                                                size: string;
                                                modified: string;
                                            };
                                        };
                                    };
                                    code: {
                                        type: string;
                                        contents: {
                                            'neural_decoder.py': {
                                                type: string;
                                                content: string;
                                                permissions: string;
                                                size: string;
                                                modified: string;
                                                executable: boolean;
                                            };
                                        };
                                    };
                                    scripts: {
                                        type: string;
                                        contents: {
                                            'pattern_monitor.sh': {
                                                type: string;
                                                content: string;
                                                permissions: string;
                                                size: string;
                                                modified: string;
                                                executable: boolean;
                                            };
                                        };
                                    };
                                };
                            };
                            '.hidden': {
                                type: string;
                                contents: {
                                    gnostic_texts: {
                                        type: string;
                                        contents: {
                                            'nag_hammadi_correlations.txt': {
                                                type: string;
                                                content: string;
                                                permissions: string;
                                                size: string;
                                                modified: string;
                                            };
                                        };
                                    };
                                    mkultra_files: {
                                        type: string;
                                        contents: {
                                            'subproject_119.txt': {
                                                type: string;
                                                content: string;
                                                permissions: string;
                                                size: string;
                                                modified: string;
                                            };
                                        };
                                    };
                                    tesla_notes: {
                                        type: string;
                                        contents: {
                                            'colorado_springs_diary.txt': {
                                                type: string;
                                                content: string;
                                                permissions: string;
                                                size: string;
                                                modified: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                    a_volkov: {
                        type: string;
                        contents: {};
                    };
                    r_keller: {
                        type: string;
                        contents: {};
                    };
                    e_hartmann: {
                        type: string;
                        contents: {};
                    };
                    pattern_communications: {
                        type: string;
                        contents: {};
                    };
                };
            };
            opt: {
                type: string;
                contents: {
                    nukeh: {
                        type: string;
                        contents: {
                            neural_bridge: {
                                type: string;
                                contents: {
                                    config: {
                                        type: string;
                                        contents: {
                                            'bridge.conf': {
                                                type: string;
                                                content: string;
                                                permissions: string;
                                                size: string;
                                                modified: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            var: {
                type: string;
                contents: {
                    log: {
                        type: string;
                        contents: {
                            'neural_sync.log': {
                                type: string;
                                content: string;
                                permissions: string;
                                size: string;
                                modified: string;
                            };
                        };
                    };
                };
            };
        };
    };
};
export class FileSystem {
    currentPath: string;
    filesystem: {
        '/': {
            type: string;
            contents: {
                home: {
                    type: string;
                    contents: {
                        nukeh_admin: {
                            type: string;
                            contents: {
                                '.bash_history': {
                                    type: string;
                                    content: string;
                                    permissions: string;
                                    size: string;
                                    modified: string;
                                };
                                '.neural_patterns': {
                                    type: string;
                                    content: string;
                                    permissions: string;
                                    size: string;
                                    modified: string;
                                };
                                resonance_scan: {
                                    type: string;
                                    content: string;
                                    permissions: string;
                                    size: string;
                                    modified: string;
                                    executable: boolean;
                                };
                                'incident_7742.txt': {
                                    type: string;
                                    content: string;
                                    permissions: string;
                                    size: string;
                                    modified: string;
                                };
                                'consciousness_matrix.log': {
                                    type: string;
                                    content: string;
                                    permissions: string;
                                    size: string;
                                    modified: string;
                                };
                                'the_pattern.hex': {
                                    type: string;
                                    content: string;
                                    permissions: string;
                                    size: string;
                                    modified: string;
                                };
                                emails: {
                                    type: string;
                                    contents: {
                                        sent: {
                                            type: string;
                                            contents: {
                                                'board_update.eml': {
                                                    type: string;
                                                    content: string;
                                                    permissions: string;
                                                    size: string;
                                                    modified: string;
                                                };
                                            };
                                        };
                                        inbox: {
                                            type: string;
                                            contents: {
                                                'urgent_memo.eml': {
                                                    type: string;
                                                    content: string;
                                                    permissions: string;
                                                    size: string;
                                                    modified: string;
                                                };
                                            };
                                        };
                                    };
                                };
                                research: {
                                    type: string;
                                    contents: {
                                        papers: {
                                            type: string;
                                            contents: {
                                                'consciousness_topology.pdf': {
                                                    type: string;
                                                    content: string;
                                                    permissions: string;
                                                    size: string;
                                                    modified: string;
                                                };
                                                'morphic_resonance_theory.pdf': {
                                                    type: string;
                                                    content: string;
                                                    permissions: string;
                                                    size: string;
                                                    modified: string;
                                                };
                                            };
                                        };
                                        code: {
                                            type: string;
                                            contents: {
                                                'neural_decoder.py': {
                                                    type: string;
                                                    content: string;
                                                    permissions: string;
                                                    size: string;
                                                    modified: string;
                                                    executable: boolean;
                                                };
                                            };
                                        };
                                        scripts: {
                                            type: string;
                                            contents: {
                                                'pattern_monitor.sh': {
                                                    type: string;
                                                    content: string;
                                                    permissions: string;
                                                    size: string;
                                                    modified: string;
                                                    executable: boolean;
                                                };
                                            };
                                        };
                                    };
                                };
                                '.hidden': {
                                    type: string;
                                    contents: {
                                        gnostic_texts: {
                                            type: string;
                                            contents: {
                                                'nag_hammadi_correlations.txt': {
                                                    type: string;
                                                    content: string;
                                                    permissions: string;
                                                    size: string;
                                                    modified: string;
                                                };
                                            };
                                        };
                                        mkultra_files: {
                                            type: string;
                                            contents: {
                                                'subproject_119.txt': {
                                                    type: string;
                                                    content: string;
                                                    permissions: string;
                                                    size: string;
                                                    modified: string;
                                                };
                                            };
                                        };
                                        tesla_notes: {
                                            type: string;
                                            contents: {
                                                'colorado_springs_diary.txt': {
                                                    type: string;
                                                    content: string;
                                                    permissions: string;
                                                    size: string;
                                                    modified: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        a_volkov: {
                            type: string;
                            contents: {};
                        };
                        r_keller: {
                            type: string;
                            contents: {};
                        };
                        e_hartmann: {
                            type: string;
                            contents: {};
                        };
                        pattern_communications: {
                            type: string;
                            contents: {};
                        };
                    };
                };
                opt: {
                    type: string;
                    contents: {
                        nukeh: {
                            type: string;
                            contents: {
                                neural_bridge: {
                                    type: string;
                                    contents: {
                                        config: {
                                            type: string;
                                            contents: {
                                                'bridge.conf': {
                                                    type: string;
                                                    content: string;
                                                    permissions: string;
                                                    size: string;
                                                    modified: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                var: {
                    type: string;
                    contents: {
                        log: {
                            type: string;
                            contents: {
                                'neural_sync.log': {
                                    type: string;
                                    content: string;
                                    permissions: string;
                                    size: string;
                                    modified: string;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
    logger: import("./utils/logger.js").Logger;
    initialized: boolean;
    initializeFilesystem(): Promise<void>;
    ensureInitialized(): Promise<void>;
    resolvePath(path: any): any;
    getItem(path: any): Promise<any>;
    ls(path?: string): Promise<any>;
    cd(path: any): Promise<any>;
    cat(path: any): Promise<any>;
    pwd(): string;
    getCurrentNode(): Promise<any>;
}
//# sourceMappingURL=filesystem.d.ts.map