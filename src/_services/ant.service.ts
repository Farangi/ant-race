// Using a custom built proxy server to resolve CORS issue on localhost
const PROXY_SERVER = 'https://stygianlgdonic-allowcors.herokuapp.com/'

export enum Status {
    NotYetRun = "NOTYETRUN",
    InProgress = "INPROGRESS",
    Calculated = "CALCULATED",
}

export interface Ant {
    name: string;
    length: number;
    color: string;
    weight: number;
    likelihood: number;
    status: Status;
    winLikelihoodCalculator: (callback: any) => void | null
}

/**
 * Ant service to handle all API interactions for 'Ants'
 * Also Incorporates other Ant methods
 */
export const antService = {
    /**
     * Fetch all Ants
     * @returns Promise<Ant[] | Error>
     */
    getAll: async function (): Promise<Ant[]> {
        try {
            const res = await fetch(`${PROXY_SERVER}https://sg-ants-server.herokuapp.com/graphql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        {
                            ants{
                                name,
                                length,
                                color,
                                weight
                            }
                        }
                    `
                })
            })
            const { data: { ants } } = await res.json()
            return ants.map((ant: Ant) => ({ ...ant, status: Status.NotYetRun, winLikelihoodCalculator: this.generateAntWinLikelihoodCalculator() }))
        } catch (err) {
            throw new Error(err)
        }
    },
    /**
     * Ant-win likelihood algorithm
     * @returns (callback) => void
     */
    generateAntWinLikelihoodCalculator: function () {
        const delay = 7000 + Math.random() * 7000;
        const likelihoodOfAntWinning = Math.random();

        return (callback: any) => {
            setTimeout(() => {
                callback(likelihoodOfAntWinning);
            }, delay);
        };
    }
}