import React from 'react';
import { GameForm, mapStateToProps, mapDispatchToProps } from './GameForm';
import { shallow } from 'enzyme';
import { updateProblemSet, updateTimer } from '../../actions';

describe('GameForm', () => {
  let wrapper;
  let mockCurrentProblemSet = 'simplify';
  let mockStartTime = 30;
  let mockUpdateProblemSet = jest.fn();
  let mockUpdateTimer = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<GameForm
      currentProblemSet={mockCurrentProblemSet}
      currentTimer={mockStartTime}
      updateProblemSet={mockUpdateProblemSet}
      updateTimer={mockUpdateTimer}
    />)
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should invoke updateProblemSet when updateSelected runs', () => {
    let event = {
      target: {
        name: 'currentProblemSet',
        value: 'derive'
      },
      preventDefault: jest.fn()
    }
    wrapper.instance().updateSelected(event);

    expect(mockUpdateProblemSet).toHaveBeenCalledWith('derive');
  })

  it('should invoke updateTimer when updateSelected runs', () => {
    let event = {
      target: {
        name: 'currentTimer',
        value: '180'
      },
      preventDefault: jest.fn()
    }
    wrapper.instance().updateSelected(event);

    expect(mockUpdateTimer).toHaveBeenCalledWith('startTime', 180);
  })

  describe('mapStateToProps', () => {
    it('should return an object with game information', () => {

      const mockState = {
        currentProblemSet: 'simplify',
        timer: {
          startTime: 30,
          isOver: true
        },
        gameStats: {
          numberCorrect: 3,
          numberIncorrect: 2
        }
      };

      const expected = {
        currentProblemSet: 'simplify',
        currentTimer: 30
      };

      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('calls dispatch with a updateProblemSet action when updateProblemSet is called', () => {

      const mockDispatch = jest.fn();
      const actionToDispatch = updateProblemSet();

      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.updateProblemSet();

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('calls dispatch with a updateTimer action when updateTimer is called', () => {

      const mockDispatch = jest.fn();
      const actionToDispatch = updateTimer();

      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.updateTimer();

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });

});
