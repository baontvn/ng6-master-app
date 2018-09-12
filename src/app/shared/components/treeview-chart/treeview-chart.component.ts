import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

const DEFAULT_PAGINATOR_NUMBER = 5;
const DEFAULT_CHART_CONTAINER_NAME = 'sample-chart';

@Component({
  selector: 'app-treeview-chart',
  templateUrl: './treeview-chart.component.html',
  styleUrls: ['./treeview-chart.component.scss']
})
export class TreeviewChartComponent implements OnInit, OnChanges {

  @Input() chartContainer: String = DEFAULT_CHART_CONTAINER_NAME;
  @Input() data: any = [];
  @Input() paginator: number = DEFAULT_PAGINATOR_NUMBER;

  @Output() action = new EventEmitter<any>();

  svg;
  duration = 750;
  treemap;
  root;
  i = 0;
  color = d3.scaleOrdinal(d3.schemeCategory10);

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      console.log('Build Tree Chart');
      this.buildChart(changes.data.currentValue);
    }
  }

  buildChart(treeData) {
    this.removeCurrentChart();
    // Set the dimensions and margins of the diagram
    const margin = { top: 0, right: 90, bottom: 30, left: window.innerWidth / 5 };
    const width = 1200;
    const height = 600;
    this.svg = d3.select(`.${this.chartContainer} .treeview-chart-container`).append('svg')
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate('
        + margin.left + ',' + margin.top + ')');
    this.treemap = d3.tree().size([height, width]);
    this.root = d3.hierarchy(treeData);
    this.root.x0 = height / 2;
    this.root.y0 = 0;
    this.changeStructure(this.root);
    this.reset(this.root);
    if (this.root.children) {
      this.root.children.forEach((company) => {
        if (company.children) {
          this.collapse(company);
        }
      });
    }
    this.update(this.root);
  }

  removeCurrentChart() {
    d3.select(`svg`).remove();
  }

  update(source, collapseNode?) {
    collapseNode = collapseNode || source;
    // Assigns the x and y position for the nodes
    const treeData = this.treemap(this.root);
    // Compute the new tree layout.
    const nodes = treeData.descendants();
    const links = treeData.descendants().slice(1);
    // Normalize for fixed-depth.
    nodes.forEach((currentNode) => { currentNode.y = currentNode.depth * 180; });
    // ***************** Nodes section **************************
    // Update the nodes...
    const node = this.svg.selectAll('g.node')
      .data(nodes, (currentNode) => currentNode.id || (currentNode.id = ++this.i));
    // Enter any new modes at the parent's previous position.
    const nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr('transform', (currentNode) => {
        return 'translate(' + source.y0 + ',' + source.x0 + ')';
      });
    // Add Images for the nodes
    nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style('fill', function (d) {
        return d._children ? 'red' : '#fff';
      })
      .on('click', this.click.bind(this));
    nodeEnter.append('svg:foreignObject')
      .attr('y', '-10')
      .attr('x', '-9')
      .attr('width', '25px')
      .attr('height', '25px')
      .html((currentNode) => this.appendIcon(currentNode.data.type))
      .on('click', this.click.bind(this));
    // Add labels for the nodes
    nodeEnter.append('text')
      .attr('dy', '1.85em')
      .attr('fill', '#2c404c')
      .attr('x', 0)
      .attr('class', (currentNode) => currentNode.data.type)
      .attr('text-anchor', 'middle')
      .style('font-size', '15px')
      .text((currentNode) => {
        return currentNode.data.name;
      })
      .on('click', (currentNode) => {
        this.action.emit({
          type: 'click',
          data: currentNode
        });
      })
      .on('mouseover', function () {
        d3.select(this)
          .attr('fill', 'red');
      })
      .on('mouseout', function () {
        d3.select(this).attr('fill', '#2c404c');
      });
    // UPDATE
    const nodeUpdate = nodeEnter.merge(node);
    // Transition to the proper position for the node
    nodeUpdate.transition()
      .duration(this.duration)
      .attr('transform', (currentNode) => {
        return 'translate(' + currentNode.y + ',' + currentNode.x + ')';
      });
    // Update the node attributes and style
    nodeUpdate.select('circle.node')
      .attr('r', 14)
      .style('fill', function (d) {
        return d._children ? 'lightsteelblue' : '#fff';
      })
      .style('stroke-opacity', '0')
      .attr('cursor', 'pointer');
    // Remove any exiting nodes
    const nodeExit = node.exit().transition()
      .duration(this.duration)
      .attr('transform', (currentNode) => {
        const sourceNode = this.findSourceNodeToCollapse(currentNode, source, collapseNode);
        return 'translate(' + sourceNode.y + ',' + sourceNode.x + ')';
      })
      .remove();
    // On exit reduce the node circles size to 0
    nodeExit.select('circle')
      .attr('r', 1e-6);
    // On exit reduce the opacity of text labels
    nodeExit.select('text')
      .style('fill-opacity', 1e-6);
    // ***************** links section **************************
    // Update the links...
    const link = this.svg.selectAll('path.link')
      .data(links, (currentNode) => currentNode.id);
    // Enter any new links at the parent's previous position.
    const linkEnter = link.enter().insert('path', 'g')
      .attr('class', 'link')
      .attr('d', (currentNode) => {
        const o = { x: source.x0, y: source.y0 };
        return this.diagonal(o, o);
      });
    // UPDATE
    const linkUpdate = linkEnter.merge(link);
    // Transition back to the parent element position
    linkUpdate.transition()
      .duration(this.duration)
      .attr('d', (currentNode) => {
        return this.diagonal(currentNode, currentNode.parent);
      });
    // Remove any exiting links
    link.exit().transition()
      .duration(this.duration)
      .attr('d', (currentNode) => {
        const sourceNode = this.findSourceNodeToCollapse(currentNode, source, collapseNode);
        const o = { x: sourceNode.x, y: sourceNode.y };
        return this.diagonal(o, o);
      })
      .remove();
    // Store the old positions for transition.
    nodes.forEach((currentNode) => {
      currentNode.x0 = currentNode.x;
      currentNode.y0 = currentNode.y;
    });
    const parents = nodes.filter((d) => {
      return (d.kid && d.kid.length > this.paginator);
    });
    this.svg.selectAll('.treeview-page').remove();
    parents.forEach((parent) => {
      if (parent._children) {
        return;
      }
      const p1 = parent.children[parent.children.length - 1];
      const p2 = parent.children[0];
      const pagingData = [];
      if (parent.page > 1) {
        pagingData.push({
          type: 'prev',
          parent: parent,
          no: (parent.page - 1)
        });
      }
      if (parent.page < Math.ceil(parent.kid.length / this.paginator)) {
        pagingData.push({
          type: 'next',
          parent: parent,
          no: (parent.page + 1)
        });
      }
      const pageControl = this.svg.selectAll('.treeview-page')
        .data(pagingData, (d) => {
          return (d.parent.id + d.type);
        }).enter()
        .append('g')
        .attr('class', 'treeview-page')
        .attr('transform', (d) => {
          const x = (d.type === 'next') ? p2.y : p1.y;
          const y = (d.type === 'prev') ? (p2.x - 30) : (p1.x + 44);
          return 'translate(' + x + ',' + y + ')';
        }).on('click', this.paginate.bind(this));
      pageControl
        .append('svg:foreignObject')
        .html((currentNode) => {
          if (currentNode.type === 'next') {
            return '<i class="fas direction-node fa-sort-down"></i>';
          } else {
            return '<i class="fas direction-node fa-sort-up"></i>';
          }
        })
        .attr('cursor', 'pointer')
        .attr('x', -5)
        .attr('y', -12.5)
        .attr('width', 50)
        .attr('height', 50);
    });
  }

  /**
   * Find source node of current node,
   * If current node have parent or grandparent or... is source node, collapse source
   * else collapse current collapseNode which is different source
   */
  findSourceNodeToCollapse(currentNode, source, collapseNode) {
    if (currentNode.id === source.id) {
      return source;
    } else if (currentNode.parent) {
      return this.findSourceNodeToCollapse(currentNode.parent, source, collapseNode);
    } else {
      return collapseNode;
    }
  }

  /**
   * If current button have parent or grandparent or... is source node, when expand node, it will add transition 600ms to show button
   * else dont add transition
   */
  checkId(currentButton, source) {
    const parent = currentButton.parent;
    if (parent) {
      if (parent.id === source.id) {
        return 600;
      } else if (parent.parent) {
        return this.checkId(parent, source);
      } else {
        return 0;
      }
    }
  }

  appendIcon(type) {
    switch (type) {
      case 'company': {
        return '<i class="tree-node far fa-building"></i>';
      }
      case 'area': {
        return '<i class="tree-node fas fa-warehouse"></i>';
      }
      case 'equipment': {
        return '<i class="tree-node far fa-hdd"></i>';
      }
      default: return '<i class="tree-node far fa-hdd"></i>';
    }
  }

  reset(currentNode) {
    if (currentNode && currentNode.kid) {
      currentNode.page = 1;
      currentNode.children = [];
      currentNode.kid.forEach((d1, i) => {
        d1.pageNo = Math.ceil((i + 1) / this.paginator);
        if (currentNode.page === d1.pageNo) {
          currentNode.children.push(d1);
        }
        this.reset(d1);
      });
    }
  }

  paginate(currentNode) {
    currentNode.parent.page = currentNode.no;
    this.setPage(currentNode.parent);
    this.update(currentNode.parent);
  }

  setPage(currentNode) {
    if (currentNode && currentNode.kid) {
      currentNode.children = [];
      currentNode.kid.forEach((currNode, i) => {
        if (currentNode.page === currNode.pageNo) {
          currentNode.children.push(currNode);
          currNode.children && currNode.data.type === 'company' ?
            currNode.children.forEach(item => this.collapse(item)) : this.collapse(currNode);
        }
      });
    }
  }

  // Creates a curved (diagonal) path from parent to the child nodes
  diagonal(s, d) {
    const path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`;
    return path;
  }
  // Toggle children on click.
  /**
   * Steps:
   * 1 if child type is "factory-container", get "project-container"(1) with same parent and set childen(1) = null;
   * 2 if child type is "project-container", get "factory-container"(1) with same parent and set childen(1) = null;
   * 3 else get child(1) have same parent and type with clicked node and have children, set children(1) = null
   */
  click(currentNode) {
    if (currentNode.children !== undefined) {
      if (currentNode.children) {
        currentNode._children = currentNode.children;
        currentNode.children = null;
      } else {
        currentNode.children = currentNode._children;
        currentNode._children = null;
      }
      // Other nodes
      let childrenNullNodes = [];
      if (currentNode.data.type && currentNode.parent) {
        childrenNullNodes = this.getChildrenHaveSameParentAndTypeExceptItSeft(currentNode);
      }
      const collapseNode = [];
      if (childrenNullNodes.length) {
        collapseNode.push(childrenNullNodes[0]);
      }
      collapseNode.length ? collapseNode.forEach((item) => {
        item._children = item.children;
        item.children = null;
        this.update(currentNode, item);
      }) : this.update(currentNode);
    }
  }

  private getChildrenHaveSameParentAndTypeExceptItSeft(crtNode) {
    const parentNode = crtNode.parent;
    return parentNode.children.filter((child) => child.type === crtNode.type && child.id !== crtNode.id && child.children);
  }

  private getContainerWithSameGrand(crtNode) {
    const grandNode = crtNode.parent.parent;
    let childenDiffCompany = [];
    grandNode.children.forEach((child) => {
      if (child.id !== crtNode.parent.id && child.children) {
        childenDiffCompany = childenDiffCompany.concat(child.children.filter((item) => {
          if (item.children && item.children.length > 0) {
            return true;
          }
        }));
      }
    });
    return childenDiffCompany;
  }

  // Collapse after the second level
  collapse(d) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach((item) => this.collapse(item));
      d.children = null;
    }
  }

  changeStructure(treeData) {
    treeData.children.forEach((item) => {
      if (item.children) {
        this.changeStructure(item);
      }
    });
    treeData.kid = treeData.children;
    treeData.children = null;
  }
}
