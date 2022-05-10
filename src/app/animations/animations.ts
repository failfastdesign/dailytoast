import { trigger, transition, style, animate, state, query, group } from '@angular/animations';

export let fadeIn = trigger('fadeIn', [
  state('withdelay', style({})),
  state('fadeinup', style({})),
  state('nofade', style({})),
  state('default', style({})),
  transition('void => withdelay', [
    style({
      opacity: 0
    }),
    animate('0.7s 0.4s ease-in')
  ]),
  transition('void => fadeinup', [
    style({
      opacity: 0,
      transform: 'translateY(100%)',
      position: 'absolute',
      left : 0,
      right: 0
    }),
    animate('0.4s 0.1s ease-in', style({
      transform: 'translateY(0%)',
      opacity: 1,
    }))
  ]),
  transition('void => nofade', [
    style({
      opacity: 1
    }),
  ]),
  transition('void => *', [
    style({
      opacity: 0
    }),
    animate('0.7s ease-in')
  ])

]);

export let fadeOut = trigger('fadeOut', [
  transition('* => void', [
    animate('0.4s ease-in', style({
      opacity: 1
    }))
  ])
]);

export let quoteState = trigger('quoteState', [
  // state('void', style({
  //   opacity: 0
  // })),
  transition('void => *', [
    animate('0.7s ease-out',  style({opacity: 1 }))
  ]),
  transition('* => void', [
    animate('0.7s ease-out',  style({opacity: 0 }))
  ]),
  transition('* => *', [
    animate('0.7s ease-in',  style({opacity: 1 })),
    animate('0.7s 2.6s ease-out',  style({opacity: 0 }))
  ]),

]);

export let scaleUp = trigger('scaleUp', [
  state('hide', style({
    opacity: 0,
  })),
  state('default', style({
    opacity: 1
  })),
  transition('default => hide', animate('0.3s ease-in-out')),
  transition('hide => default', animate('0.2s ease-in-out')),
  transition(':enter', [
    style({
      transform: 'scale(0.2)'
    }),
    animate('0.3s ease-in-out', style({
      transform: 'scale(1)'
    }))
  ])
]);

export let fadeInUp = trigger('fadeInUp', [
  transition(':enter', [

  ])
]);
export let pagePushUp = trigger('pagePushUp', [
  transition(':enter', [
    style({
      transform: 'translateY(10%)',
      position: 'absolute',
      opacity: 0,
      width: '100%'
    }),
    animate('.4s ease-in', style({
      transform: 'translateY(0)',
      opacity: 1
      // position: 'relative',
    }))
  ])
]);

export let pagePushDown = trigger('pagePushDown', [
  transition('* => void', [
    style({
      position: 'absolute',
    }),
    animate('0.3s 0.1s ease-out', style({
      transform: 'translateY(100vh)',
    })),
  ])
]);

export let pagePullDown = trigger('pagePullDown', [
  state('*', style({
//  position: 'absolute',
  })),
  transition(':enter', [
    group([
      query('.timer', [
        style({
          transform: 'translateY(-100%)',
          // position: 'absolute',
        }),
        animate('.3s ease-in', style({
          transform: 'translateY(0)',
          // position: 'relative',
        })),
      ]),
      query('.participant-dashboard', [
        style({
          transform: 'translateY(-50%)',
        }),
        animate('0.35s ease-in', style({
          transform: 'translateY(0)',
        })),
      ]),
    ])
  ]),
]);


export let counterState = trigger('counterState', [
  state('next', style({ opacity: 1 })),
  state('ready', style({ opacity: 1 })),
  transition('void => ready', [
    style({
      transform: 'scale(0)'
    }),
    animate('0.2s ease-in-out', style({
      transform: 'scale(1.05)'
    })),
    animate('0.05s ease-in-out', style({
      transform: 'scale(0.95)'
    })),
    animate('0.05s ease-in-out', style({
      transform: 'scale(1)'
    }))
  ]),
  transition('* => *', [
    style({
      transform: 'scale(0.2)'
    }),
    animate('0.3s ease-in-out', style({
      transform: 'scale(1)'
    }))
  ])
]);

export let swipeState = trigger('swipeState', [
  state('down', style({ opacity: 1 })),
  state('swipe', style({ opacity: 1 })),
  transition('void => down', [
    style({
      transform: 'translateY(-40vh)',
    }),
    animate('0.25s ease-in-out', style({
      transform: 'translateY(10px)',
    })),
    animate('0.25s ease-in-out', style({
      transform: 'translateY(0)',
    })),
  ]),
  transition('* => void', [
    style({
      transform: 'translateX(0)',
      position: 'absolute'
    }),
    animate('0.3s ease-in-out', style({
      transform: 'translateX(-100vw)',
    })),
  ]),
  transition('* => *', [
    style({
      transform: 'translateX(100vw)',
      // position: 'absolute'
    }),
    animate('0.3s ease-in-out', style({
      transform: 'translateX(0vw)',
    })),
  ]),
]);

export let scaleIn = trigger('scaleIn', [
  transition('void => ready', [
    style({
      transform: 'translate(-50%,50%) scale(0)'
    }),
    animate('0.7s ease-in', style({
      transform: 'translate(-50%,50%) scale(1)'
    }))
  ])
]);
export let timerState = trigger('timerState', [
  state('default', style({
    opacity: 1
  })),
  state('hide', style({
    opacity: 0
  })),
  transition('default => hide', animate('0.3s ease-in-out')),
  transition('hide => default', animate('0.2s ease-in-out')),
]);
export let popupState = trigger('popupState', [
  transition(':enter', [
    group([
      style({
        transform: 'scale(0.5)'
      }),
      animate('0.2s ease-in'),
      query('.pause', [
        style({
          opacity: 0
        }),
        animate('0.3s 50ms ease-in'),
      ])
    ])
  ]),
  transition(':leave', [
    group([
      style({
        transform: 'scale(1)'
      }),
      animate('0.2s ease-out', style({ transform: 'scale(0.5)' })),
      query('.pause', [
        style({
          opacity: 1
        }),
        animate('0.2s ease-out', style({ opacity: 0 })),
      ])
    ])
  ]),
]);


export let bannerState = trigger('bannerState', [
  state('green', style({
    background: '#23D7C5'
  })),
  state('yellow', style({
    background: '#FFD658'
  })),
  state('red', style({
    background: '#FF6A74'
  })),
  transition('* => yellow', [
    group([
    animate('0.2s 0.5s ease-in'),
    query('.timer__banner_bg', [
      style({
        background: '#FFD658',
        width: 0,
        height: 0
      }),
      animate('0.7s ease-in-out', style({
        width: '200vh',
        height: '200vh'
      })),
    ]),
  ])
]),
  transition('* => red', [
    group([
    animate('0.2s 0.5s ease-in'),
    query('.timer__banner_bg', [
      style({
        background: '#FF6A74',
        width: 0,
        height: 0
      }),
      animate('0.7s ease-in-out', style({
        width: '200vh',
        height: '200vh'
      })),
    ]),
  ])
]),
]);

export let pMessageState = trigger('pMessageState', [
  state('hide', style({
    opacity: 0
  })),
  state('default', style({
    opacity: 1
  })),
  transition('default => hide', animate('0.3s ease-in-out')),
  transition('hide => default', animate('0.2s ease-in-out')),
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate('0.5s ease-in')
  ]),
  transition(':leave', [
    animate('0.3s ease-out', style({
      opacity: 0
    }))
  ])
]);

export let progressFadeState = trigger('progressFadeState', [
  transition(':leave', [
    animate('0.3s 0.1s ease-out', style({
      opacity: 0
    }))
  ])
]);
