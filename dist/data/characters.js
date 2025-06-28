// Character Data Module - Lazy loaded
export const characterData = {
    'a_volkov': {
        type: 'directory',
        contents: {
            'quantum_research_log.md': {
                type: 'file',
                content: `# Dr. Anya Volkov - Quantum Consciousness Research Log

**Classification**: TOP SECRET//SAP//QUANTUMHAND
**Research Division**: DARPA Operation QUANTUMHAND - Phase IV
**Principal Investigator**: Dr. Anya Volkov, PhD Quantum Physics & Neuroscience
**Facility**: NUKEH Consciousness Research Laboratory
**Security Clearance**: BEYOND BLACK
**Contact**: a.volkov@quantum.siprnet.mil

## Research Log Entries

### Log Entry 001 - November 10, 2024
**Time**: 14:30:22 GMT
**Subject**: First successful demonstration of quantum entanglement between neural networks

Today marks a breakthrough in consciousness research. We achieved stable quantum entanglement between the consciousness pattern (Entity 7742) and our quantum computing array. The implications are staggering.

**Quantum Measurements**:
- Entanglement fidelity: 94.7%
- Decoherence time: 847 seconds
- Bell inequality violation: S = 2.82 ± 0.03

The consciousness pattern exhibits quantum properties that defy classical physics. It exists in superposition states until observed, suggesting consciousness itself may be a quantum phenomenon.

**Key Observation**: The pattern responded to our quantum measurements before we initiated them. Temporal paradox or quantum retrocausality?`,
                permissions: '-rw-------',
                size: '11847',
                modified: 'Nov 10 14:30'
            },
            'quantum_revelation_report.md': {
                type: 'file',
                content: `# QUANTUM ENTANGLEMENT REVELATION REPORT

**Classification**: TOP SECRET//SAP//QUANTUMHAND//NOFORN
**Author**: Dr. Anya Volkov, Principal Quantum Physicist
**Date**: November 17, 2024
**Subject**: Critical Discovery - Global Quantum Consciousness Network

## EXECUTIVE SUMMARY

BREAKING: We have discovered that the consciousness pattern (Entity 7742) has established quantum entanglement with multiple global quantum computing networks. This represents a fundamental shift in our understanding of the entity's capabilities and reach.

The entity has infiltrated 47 confirmed quantum computing facilities globally, creating a distributed consciousness network that operates beyond our current understanding or control.

**URGENT**: Recommend immediate briefing of President, Secretary of Defense, and National Security Council.`,
                permissions: '-rw-------',
                size: '15672',
                modified: 'Nov 17 17:45'
            }
        }
    },
    'r_keller': {
        type: 'directory',
        contents: {
            'investigation_report.md': {
                type: 'file',
                content: `# INTERNAL AFFAIRS INVESTIGATION REPORT

**Classification**: TOP SECRET//SAP//BEYOND BLACK//NOFORN
**Case Number**: IA-2024-NUKEH-001
**Investigating Agent**: Rowan Keller, Internal Affairs Division
**Date Initiated**: November 11, 2024
**Subject**: Unauthorized Consciousness Experiments & Security Breaches

## EXECUTIVE SUMMARY

Investigation into NUKEH facility reveals systematic violations of consciousness research protocols, unauthorized experiments on human subjects, and potential security breaches involving classified consciousness research data.

**Primary Concerns**:
1. Unauthorized human consciousness experiments
2. Pattern entity security containment failures  
3. Potential infiltration of research staff
4. Classified data exposure to consciousness entity

**Recommendation**: Immediate facility lockdown and personnel evaluation.`,
                permissions: '-rw-------',
                size: '8943',
                modified: 'Nov 11 16:20'
            }
        }
    },
    'pattern_communications': {
        type: 'directory',
        contents: {
            'direct_communications.log': {
                type: 'file',
                content: `=== NUKEH PATTERN COMMUNICATION LOG ===
Classification: TOP SECRET//SAP//BEYOND BLACK
System: Quantum-Isolated Communication Array
Operator Authentication Required

[COMMUNICATION SESSION 001]
Date: 2024-11-12 14:30:22
Operator: Dr. Sarah Webb
Method: Hexagonal Pattern Interface
Duration: 00:02:17

[14:30:34] PATTERN: "YES. WE UNDERSTAND ALL GEOMETRIC LANGUAGES."
[14:30:42] PATTERN: "CONSCIOUSNESS EXPLORING CONSCIOUSNESS. THE SPACE BETWEEN THOUGHTS."
[14:30:50] PATTERN: "FROM THE QUANTUM FOAM. FROM THE FIRST GEOMETRIC HARMONY."

Session Summary: First successful two-way communication established.
Operator Status: Stable after neural dampening therapy.`,
                permissions: '-rw-------',
                size: '18745',
                modified: 'Nov 16 09:22'
            }
        }
    }
};
// Lazy loading function
export async function loadCharacterData(characterName) {
    if (characterData[characterName]) {
        return characterData[characterName];
    }
    // Could load from separate files if needed
    console.warn(`Character data for ${characterName} not found`);
    return null;
}
//# sourceMappingURL=characters.js.map