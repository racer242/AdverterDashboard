import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import Label from '@material-ui/icons/Label';
import Title from './Title';


import ShopIcon from '@material-ui/icons/Shop';
import BusinessIcon from '@material-ui/icons/Business';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import WebIcon from '@material-ui/icons/Web';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import BallotIcon from '@material-ui/icons/Ballot';
import TouchAppIcon from '@material-ui/icons/TouchApp';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    '&:hover > $content': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus > $content, &$selected > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[300]})`,
      color: 'var(--tree-view-color)',
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
      backgroundColor: 'transparent',
    },
  },
  content: {
    color: theme.palette.text.secondary,

    fontWeight: theme.typography.fontWeightRegular,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightBold,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  subItem: {
    paddingLeft: theme.spacing(2),
  },
  subItemNoIcon: {
    paddingLeft: theme.spacing(4),
  },
  expanded: {
  },
  selected: {
  },
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelRootShifted: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
  labelInfo: {
    paddingRight: theme.spacing(1),
  },
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

  return (
    <TreeItem
      label={
        <div className={(props.labelIcon)?classes.labelRoot:classes.labelRootShifted}>
          { (
              ()=>{
                if (props.labelIcon) {
                  return (
                    <LabelIcon color="inherit" className={classes.labelIcon} />
                  )
                }
                return []
              }
            )()
          }
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit" className={classes.labelInfo}>
            {labelInfo}
          </Typography>
        </div>
      }
      className={(props.labelIcon)?classes.subItem:classes.subItemNoIcon}
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
        // paddingLeft:shift,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}


export default function CampTree(props) {

  let tree={}
  for (let i = 0; i < props.reports.length; i++) {
    let camp=props.reports[i];
    let client=camp.name.split("/")[0];
    if (!tree[client]) {
      tree[client]=[]
    }
    tree[client].push(camp);
  }
  let clients=Object.keys(tree);
  clients.sort();

  const clickHandler = (event,nodeId) => {
    if (props.onSelect) {
      if (nodeId) {
        let parseId=nodeId.split("/");
        if ((parseId[0]!="")&&(parseId.length>1)) {
          let client=parseId[0];
          let camp=parseId[1];
          let feature=parseId[2];
          let subject=parseId[3];
          props.onSelect(client,camp,feature,subject);
        }
      }
    }
  }

  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <TreeView
        defaultExpanded={clients}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
        onNodeSelect={clickHandler}
      >
        {
          clients.map((client,i) => (
            <StyledTreeItem
              key={"client"+i}
              nodeId={client}
              labelText={client}
              labelIcon={BusinessIcon}
              labelInfo={tree[client].length}
            >
              {
                tree[client].map((camp,j) => {
                  let campName=camp.name.split("/")[1];

                  let sections=Object.keys(camp.sections);
                  sections.sort();
                  let publishers=Object.keys(camp.publishers);
                  publishers.sort();
                  let platforms=Object.keys(camp.platforms);
                  platforms.sort();
                  let formats=Object.keys(camp.formats);
                  formats.sort();
                  let feeds=Object.keys(camp.feeds);
                  feeds.sort();


                  let creativeAmount=Object.keys(camp.creatives).length;
                  let sectionAmount=sections.length;
                  let publisherAmount=publishers.length;
                  let platformAmount=platforms.length;
                  let formatAmount=formats.length;
                  let feedAmount=feeds.length;

                  return(
                    <StyledTreeItem
                      key={"camp"+j}
                      nodeId={"/camp"+j}
                      labelText={campName}
                      labelIcon={ShopIcon}
                      labelInfo={creativeAmount}
                    >
                      { (
                          ()=>{
                            if (sectionAmount>0) {
                              return (
                                <StyledTreeItem
                                  key={"sections"+j}
                                  nodeId={"/sections"+j}
                                  labelText="Разделы"
                                  labelIcon={TurnedInIcon}
                                  labelInfo={sectionAmount}
                                >
                                {
                                  sections.map((section,k) => (
                                    <StyledTreeItem
                                      key={"section"+j+"_"+k}
                                      nodeId={camp.name+"/section/"+section}
                                      labelText={section}
                                      labelInfo={camp.sections[section]}
                                    />
                                  ))
                                }
                                </StyledTreeItem>
                              )
                            }
                            return []
                          }
                        )()
                      }
                      { (
                          ()=>{
                            if (publisherAmount>0) {
                              return (
                                <StyledTreeItem
                                  key={"publishers"+j}
                                  nodeId={"/publishers"+j}
                                  labelText="Площадки"
                                  labelIcon={WebIcon}
                                  labelInfo={publisherAmount}
                                >
                                  {
                                    publishers.map((publisher,k) => (
                                      <StyledTreeItem
                                        key={"publisher"+j+"_"+k}
                                        nodeId={camp.name+"/publisher/"+publisher}
                                        labelText={publisher}
                                        labelInfo={camp.publishers[publisher]}
                                      />
                                    ))
                                  }
                                </StyledTreeItem>
                              )
                            }
                            return []
                          }
                        )()
                      }
                      { (
                          ()=>{
                            if (platformAmount>0) {
                              return (
                                <StyledTreeItem
                                  key={"platforms"+j}
                                  nodeId={"/platforms"+j}
                                  labelText="Платформы"
                                  labelIcon={SettingsApplicationsIcon}
                                  labelInfo={platformAmount}
                                >
                                  {
                                    platforms.map((platform,k) => (
                                      <StyledTreeItem
                                        key={"platform"+j+"_"+k}
                                        nodeId={camp.name+"/platform/"+platform}
                                        labelText={platform}
                                        labelInfo={camp.platforms[platform]}
                                      />
                                    ))
                                  }
                                </StyledTreeItem>
                              )
                            }
                            return []
                          }
                        )()
                      }
                      { (
                          ()=>{
                            if (formatAmount>0) {
                              return (
                                <StyledTreeItem
                                  key={"formats"+j}
                                  nodeId={"/formats"+j}
                                  labelText="Форматы"
                                  labelIcon={AspectRatioIcon}
                                  labelInfo={formatAmount}
                                >
                                  {
                                    formats.map((format,k) => (
                                      <StyledTreeItem
                                        key={"format"+j+"_"+k}
                                        nodeId={camp.name+"/format/"+format}
                                        labelText={format}
                                        labelInfo={camp.formats[format].count}
                                      />
                                    ))
                                  }
                                </StyledTreeItem>
                              )
                            }
                            return []
                          }
                        )()
                      }
                      { (
                          ()=>{
                            if (feedAmount>0) {
                              return (
                                <StyledTreeItem
                                  key={"feeds"+j}
                                  nodeId={"/feeds"+j}
                                  labelText="Фиды"
                                  labelIcon={BallotIcon}
                                  labelInfo={feedAmount}
                                >
                                  {
                                    feeds.map((feed,k) => (
                                      <StyledTreeItem
                                        key={"feed"+j+"_"+k}
                                        nodeId={camp.name+"/feed/"+feed}
                                        labelText={feed}
                                        labelInfo={camp.feeds[feed]}
                                      />
                                    ))
                                  }
                                </StyledTreeItem>
                              )
                            }
                            return []
                          }
                        )()
                      }
                      { (
                          ()=>{
                            if (creativeAmount>0) {
                              return (
                                <StyledTreeItem
                                  key={"creatives"+j}
                                  nodeId={camp.name+"/creatives/"}
                                  labelText="Все креативы"
                                  labelIcon={TouchAppIcon}
                                  labelInfo={creativeAmount}
                                />
                              )
                            }
                            return []
                          }
                        )()
                      }
                    </StyledTreeItem>
                  )
                })
              }
            </StyledTreeItem>
          ))
        }
      </TreeView>
    </React.Fragment>
  );
}
