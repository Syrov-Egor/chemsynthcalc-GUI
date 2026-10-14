package bridge

import (
	"context"
	"sync"
)

// Controller runs calculations serially and supports cancellation. It is safe
// for concurrent use: the frontend may ask to stop a calculation while it is
// still running.
type Controller struct {
	cancelFunc    context.CancelFunc
	cancelMutex   sync.RWMutex
	isCalculating bool
}

// NewController returns a ready-to-use Controller.
func NewController() *Controller {
	return &Controller{}
}

// StopCalculation cancels the calculation currently in progress, if any.
func (c *Controller) StopCalculation() {
	c.cancelMutex.Lock()
	defer c.cancelMutex.Unlock()

	if c.cancelFunc != nil {
		c.cancelFunc()
	}
}

// IsCalculating reports whether a calculation is currently in progress.
func (c *Controller) IsCalculating() bool {
	c.cancelMutex.RLock()
	defer c.cancelMutex.RUnlock()
	return c.isCalculating
}

// PerformCalculation runs the requested calculation mode. Only one calculation
// runs at a time; concurrent calls get a failure result instead of queueing.
func (c *Controller) PerformCalculation(params CalculationParams) CalculationResult {
	c.cancelMutex.Lock()
	if c.isCalculating {
		c.cancelMutex.Unlock()
		return CalculationResult{
			Success: false,
			Message: "Another calculation is already in progress",
		}
	}

	ctx, cancel := context.WithCancel(context.Background())
	c.cancelFunc = cancel
	c.isCalculating = true
	c.cancelMutex.Unlock()

	defer func() {
		c.cancelMutex.Lock()
		c.cancelFunc = nil
		c.isCalculating = false
		c.cancelMutex.Unlock()
	}()

	switch params.Mode {
	case "formula":
		return calcFormulaMode(ctx, &params)
	case "balance":
		return calcBalanceMode(ctx, &params)
	case "masses":
		return calcMassesMode(ctx, &params)
	default:
		return CalculationResult{}
	}
}
