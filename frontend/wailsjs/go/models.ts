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
	export class TabularData {
	    formula: string;
	    molar: number;
	    masses: number;
	
	    static createFrom(source: any = {}) {
	        return new TabularData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.formula = source["formula"];
	        this.molar = source["molar"];
	        this.masses = source["masses"];
	    }
	}
	export class CalculationResult {
	    success: boolean;
	    message: string;
	    details: string;
	    cancelled: boolean;
	    tabular: TabularData[];
	
	    static createFrom(source: any = {}) {
	        return new CalculationResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.success = source["success"];
	        this.message = source["message"];
	        this.details = source["details"];
	        this.cancelled = source["cancelled"];
	        this.tabular = this.convertValues(source["tabular"], TabularData);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

