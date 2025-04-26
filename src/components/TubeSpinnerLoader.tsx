import LoadingTubeSpinner from '@/../public/loading-tube-spinner.svg'

export default function TubeSpinnerLoader({ width }: { width: number }) {
    return <img src={LoadingTubeSpinner.src} width={width}/>
}