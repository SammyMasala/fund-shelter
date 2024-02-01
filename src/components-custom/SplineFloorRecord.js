import Spline from '@splinetool/react-spline';

export default function SplineFloorRecord({limit, spending}) {
    const spentPercentage = spending/limit*100;
    if(spentPercentage < 65){
        return (
            <Spline className="spline-floor" scene='https://prod.spline.design/ZnTQbWbB2ayEhgOm/scene.splinecode' />
        );
    }else{ 
        return (
            <Spline className="spline-floor" scene='https://prod.spline.design/O7RYPJ-mS4RL48pD/scene.splinecode' />
        );
    }
}