import React, { useEffect, useState } from 'react';
import './Home.css';
import { Ant, antService, Status } from '../../_services/ant.service';
import weightSvg from '../../assets/scale.svg'
import lengthSvg from '../../assets/ruler.svg'
import awardSvg from '../../assets/award.svg'
import { useHistory } from 'react-router';
import { ROUTE_NAMES } from '../../routes/route_names';
import MovingAnts from './components/MovingAnts';

const AntSvg = (color: string) => <svg id="Capa_1" fill={color} enableBackground="new 0 0 512.003 512.003" height="512" viewBox="0 0 512.003 512.003" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m478.482 248.679c-4.596-6.893-13.909-8.755-20.801-4.16l-81.17 54.113-76.292-57.219c.512-4.704.782-9.526.782-14.413 0-3.131-.116-6.233-.328-9.298l70.584 23.528c1.554.518 3.154.77 4.741.77 3.916 0 7.75-1.535 10.608-4.394l30-30c1.923-1.922 3.286-4.331 3.945-6.969l30-120c2.01-8.037-2.877-16.181-10.914-18.19-8.028-2.007-16.181 2.877-18.189 10.914l-28.993 115.969-20.507 20.507-78.747-26.249c-.802-1.977-1.656-3.892-2.572-5.724-.945-1.889-1.947-3.669-2.99-5.363 8.302-5.209 16.024-12.478 22.825-21.627 12.858-17.299 20.535-39.308 20.535-58.875 0-19.065-7.145-34.527-20.04-45.243 8.419-10.433 21.216-16.756 35.043-16.756 8.284 0 15-6.716 15-15s-6.716-15-15-15c-25.328 0-48.588 12.728-62.346 33.296-8.308-2.164-17.564-3.296-27.654-3.296s-19.347 1.132-27.654 3.296c-13.759-20.568-37.019-33.296-62.346-33.296-8.284 0-15 6.716-15 15s6.716 15 15 15c13.827 0 26.624 6.323 35.04 16.757-12.895 10.716-20.04 26.178-20.04 45.243 0 19.566 7.677 41.575 20.535 58.875 6.801 9.15 14.523 16.418 22.825 21.627-1.043 1.695-2.045 3.474-2.99 5.363-.916 1.832-1.77 3.747-2.572 5.724l-78.747 26.249-20.507-20.507-28.993-115.969c-2.01-8.037-10.158-12.923-18.189-10.914-8.037 2.009-12.924 10.153-10.914 18.19l30 120c.659 2.637 2.022 5.046 3.945 6.969l30 30c2.859 2.859 6.692 4.394 10.608 4.394 1.587 0 3.188-.252 4.741-.77l70.584-23.528c-.212 3.064-.328 6.167-.328 9.298 0 4.887.271 9.709.782 14.413l-76.292 57.219-81.17-54.113c-6.893-4.595-16.207-2.733-20.801 4.16-4.596 6.893-2.733 16.206 4.16 20.801l90 60c2.524 1.683 5.424 2.519 8.319 2.519 3.173 0 6.341-1.005 9.001-3l74.843-56.132c.492 1.111.997 2.206 1.527 3.267 1.114 2.227 2.303 4.31 3.552 6.266-11.47 8.151-21.331 20.742-28.789 36.482l-68.454 45.636c-2.172 1.448-3.929 3.438-5.096 5.772l-60 120c-3.705 7.41-.702 16.42 6.708 20.125 2.153 1.077 4.441 1.587 6.696 1.587 5.502 0 10.8-3.039 13.428-8.295l58.219-116.437 35.388-23.592c-1.321 9.055-2.023 18.532-2.023 28.321 0 67.29 32.944 120 75 120s75-52.71 75-120c0-9.789-.702-19.266-2.023-28.321l35.388 23.592 58.219 116.437c2.628 5.256 7.925 8.295 13.428 8.295 2.254 0 4.543-.51 6.696-1.587 7.41-3.705 10.413-12.715 6.708-20.125l-60-120c-1.167-2.335-2.924-4.324-5.096-5.772l-68.454-45.636c-7.458-15.741-17.318-28.331-28.789-36.482 1.249-1.956 2.438-4.039 3.552-6.266.531-1.061 1.035-2.156 1.527-3.267l74.848 56.132c2.661 1.996 5.827 3 9.001 3 2.895 0 5.795-.836 8.319-2.519l90-60c6.893-4.596 8.756-13.908 4.16-20.802z" /></g></svg>
const LogoutSvg = (color: string = "currentColor") => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={color}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>

function Home() {
    const appHistory = useHistory()
    const [ants, setAnts] = useState<Ant[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        antService.getAll().then(ants => {
            setAnts(ants)
        }).catch(err => alert(err))
            .finally(() => {
                setLoading(false)
            })
    }, [])

    /**
     * Handler function to run calculations on all ants simultaneously
     */
    const runCalculationsSimultaneously = () => {
        for (const ant of ants) {
            ant.status = Status.InProgress
            setAnts([...ants])

            ant.winLikelihoodCalculator((likelihood: number) => {
                ant.likelihood = likelihood
                ant.status = Status.Calculated
                ants.sort((a, b) => b.likelihood - a.likelihood)
                setAnts([...ants])
            })
        }
    }

    /**
     * Gets the state of all tests together
     * @returns Status
     */
    const getAllStatus = () => {
        const InProgress = ants.some(ant => ant.status === Status.InProgress)
        if (InProgress) {
            return Status.InProgress
        } else {
            const Completed = ants.every(ant => ant.status === Status.Calculated)
            if (Completed) {
                return Status.Calculated
            } else {
                return Status.NotYetRun
            }
        }
    }

    /**
     * Show calculation status for given ant
     * @param ant : Ant
     * @returns JSX.Element
     */
    const showAntStatus = (ant: Ant) => {
        switch (ant.status) {
            case Status.NotYetRun:
                return <div>--</div>
            case Status.Calculated:
                return <div>{ant.likelihood?.toFixed(2)}</div>
            case Status.InProgress:
                return <div className="loader"></div>
            default:
                return <div>--</div>
        }
    }

    /**
     * Logout Handler
     */
    const handleLogout = () => {
        window.localStorage.removeItem("userToken")
        appHistory.push(ROUTE_NAMES.login)
    }

    return (
        <div className="App">
            <header className="bg-indigo-500 flex justify-evenly">
                <div></div>
                <div className="flex flex-col align-middle justify-center text-white text-2xl">
                    <h1>Ants Race</h1>
                    <p>({getAllStatus()})</p>
                </div>
                <div className="flex align-middle">
                    <button onClick={handleLogout} >{LogoutSvg("white")}</button>
                </div>
            </header>
            <div className="mt-2 mb-2 ml-3 mr-3">
                {!!loading && <div>Please wait while the ants are loading... </div>}
                {!!ants.length && ants.map(ant => {
                    return (
                        <div className="p-2 shadow-md border-r-4 m-1 flex flex-row justify-between" key={ant.name}>
                            <p style={{ height: "40px", width: "40px" }}>
                                {AntSvg(ant.color)}
                            </p>

                            <div style={{ display: 'flex', width: "50%" }}>
                                <p className="cool-font">{ant.name}</p>
                            </div>
                            <p>
                                <img src={weightSvg} />
                                {ant.weight}
                            </p>
                            <p>
                                <img src={lengthSvg} />
                                {ant.length}
                            </p>
                            <p>
                                <img src={awardSvg} />
                                {showAntStatus(ant)}
                            </p>
                        </div>
                    )
                })}
            </div>
            <div>
                <button disabled={loading} className="btn" onClick={runCalculationsSimultaneously}>Run Calculations</button>
            </div>
            <MovingAnts ants={ants} />
        </div>
    );
}

export default Home;
