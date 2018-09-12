import { Component, OnInit } from '@angular/core';
import { Navigation } from '../../../../../../core/models/navigation.model';

@Component({
  selector: 'app-sub-one-main',
  templateUrl: './sub-one-main.component.html',
  styleUrls: ['./sub-one-main.component.scss']
})
export class SubOneMainComponent implements OnInit {

  chartClassName: String = 'sample-tree-chart';

  mockData =
    {
      'id': 1,
      'name': 'FPT Company',
      'type': 'company',
      'children': [
        {
          'id': 9,
          'name': 'Smart Factory',
          'type': 'area',
          'children': [
            {
              'id': 68,
              'name': 'Super Tool',
              'type': 'equiment',
              'children': [
                {
                  'id': 24,
                  'name': 'Dump 8.2',
                  'type': 'equipment',
                  'children': [
                    {
                      'id': 89,
                    'name': 'Dump 8.2.1',
                    'type': 'equipment'
                    }
                  ]
                },
                {
                  'id': 111,
                  'name': 'Dump 8.2',
                  'type': 'equipment',
                  'children': [
                    {
                      'id': 819,
                    'name': 'Dump 8.2.1',
                    'type': 'equipment',
                      'children': [
                        {
                          'id': 24,
                          'name': 'Dump 8.2',
                          'type': 'equipment',
                          'children': [
                            {
                              'id': 89,
                            'name': 'Dump 8.2.1',
                            'type': 'equipment'
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              'id': 67,
              'name': 'TanOT',
              'type': 'equipment',
              'children': [
                {
                  'id': 20,
                  'name': 'Process 7.1',
                  'type': 'process'
                }
              ]
            }
          ]
        },
        {
          'id': 19,
          'name': 'Smart Factory 1',
          'type': 'area',
          'children': [
            {
              'id': 24,
              'name': 'Dump 8.2',
              'type': 'equipment',
              'children': [
                {
                  'id': 89,
                'name': 'Dump 8.2.1',
                'type': 'equipment'
                }
              ]
            }
          ]
        },
        {
          'id': 29,
          'name': 'Smart Factory 2',
          'type': 'area',
          'children': [
            {
              'id': 24,
              'name': 'Dump 8.2',
              'type': 'equipment',
              'children': [
                {
                  'id': 89,
                'name': 'Dump 8.2.1',
                'type': 'equipment'
                }
              ]
            }
          ]
        },
        {
          'id': 39,
          'name': 'Smart Factory 3',
          'type': 'area'
        },
        {
          'id': 49,
          'name': 'Smart Factory 4',
          'type': 'area'
        },
        {
          'id': 59,
          'name': 'Smart Factory 5',
          'type': 'area'
        },
        {
          'id': 69,
          'name': 'Smart Factory 226',
          'type': 'area'
        },
        ,
        {
          'id': 69,
          'name': 'Smart Factory 446',
          'type': 'area',
          'children': [
            {
              'id': 24,
              'name': 'Dump 8.2',
              'type': 'equipment',
              'children': [
                {
                  'id': 89,
                'name': 'Dump 8.2.1',
                'type': 'equipment'
                }
              ]
            }
          ]
        },
        ,
        {
          'id': 69,
          'name': 'Smart Factory 36',
          'type': 'area',
          'children': [
            {
              'id': 24,
              'name': 'Dump 8.2',
              'type': 'equipment',
              'children': [
                {
                  'id': 89,
                'name': 'Dump 8.2.1',
                'type': 'equipment'
                }
              ]
            }
          ]
        },
        ,
        {
          'id': 69,
          'name': 'Smart Factory 16',
          'type': 'area',
          'children': [
            {
              'id': 24,
              'name': 'Dump 8.2',
              'type': 'equipment',
              'children': [
                {
                  'id': 89,
                'name': 'Dump 8.2.1',
                'type': 'equipment'
                }
              ]
            }
          ]
        }
      ]
    };

  chartData: any = [];

  constructor() { }

  ngOnInit() {
    this.chartData = new Navigation(this.mockData).treeViewData;
  }

  handleChartAction(event) {
    console.log(event);
  }

}
