export namespace main {
	
	export class CalculationParams {
	    equation: string;
	    mode: string;
	    algorithm: string;
	    runMode: string;
	    targetNum: number;
	    targetMass: number;
	    intify: boolean;
	    outputPrecision: number;
	    floatTolerance: number;
	    maxComb: number;
	
	    static createFrom(source: any = {}) {
	        return new CalculationParams(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.equation = source["equation"];
	        this.mode = source["mode"];
	        this.algorithm = source["algorithm"];
	        this.runMode = source["runMode"];
	        this.targetNum = source["targetNum"];
	        this.targetMass = source["targetMass"];
	        this.intify = source["intify"];
	        this.outputPrecision = source["outputPrecision"];
	        this.floatTolerance = source["floatTolerance"];
	        this.maxComb = source["maxComb"];
	    }
	}
	export class CalculationResult {
	    success: boolean;
	    message: string;
	    details: string;
	    cancelled: boolean;
	
	    static createFrom(source: any = {}) {
	        return new CalculationResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.success = source["success"];
	        this.message = source["message"];
	        this.details = source["details"];
	        this.cancelled = source["cancelled"];
	    }
	}

}

