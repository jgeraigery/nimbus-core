/**
 * @license
 * Copyright 2016-2019 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

import {
  HashLocationStrategy,
  Location,
  LocationStrategy
} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularSvgIconModule } from 'angular-svg-icon';
import {
  SESSION_STORAGE,
  StorageServiceModule
} from 'angular-webstorage-service';
import { JL } from 'jsnlog';
import { accordionElementWithForm, accordionElementWithNoForm } from 'mockdata';
import { configureTestSuite } from 'ng-bullet';
import { ChartModule } from 'primeng/chart';
import { EditorModule } from 'primeng/editor';
import { KeyFilterModule } from 'primeng/keyfilter';
import {
  AccordionModule,
  AutoCompleteModule,
  CalendarModule,
  CheckboxModule,
  DataTableModule,
  DialogModule,
  DragDropModule,
  DropdownModule,
  FileUploadModule,
  GrowlModule,
  InputMaskModule,
  InputSwitchModule,
  ListboxModule,
  OverlayPanelModule,
  PickListModule,
  ProgressBarModule,
  ProgressSpinnerModule,
  RadioButtonModule,
  SharedModule,
  TabViewModule,
  TooltipModule,
  TreeTableModule
} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Subject } from 'rxjs';
import { DisplayValueDirective } from '../../../directives/display-value.directive';
import { PrintDirective } from '../../../directives/print.directive';
import { DateTimeFormatPipe } from '../../../pipes/date.pipe';
import { SelectItemPipe } from '../../../pipes/select-item.pipe';
import { AppInitService } from '../../../services/app.init.service';
import { ConfigService } from '../../../services/config.service';
import { GridService } from '../../../services/grid.service';
import { CustomHttpClient } from '../../../services/httpclient.service';
import { LoaderService } from '../../../services/loader.service';
import { LoggerService } from '../../../services/logger.service';
import { PageService } from '../../../services/page.service';
import { PrintService } from '../../../services/print.service';
import {
  CUSTOM_STORAGE,
  SessionStoreService
} from '../../../services/session.store';
import { setup } from '../../../setup.spec';
import { Param } from '../../../shared/param-state';
import { CardDetailsFieldGroupComponent } from '../card/card-details-field-group.component';
import { CardDetailsFieldComponent } from '../card/card-details-field.component';
import { CardDetailsGrid } from '../card/card-details-grid.component';
import { CardDetailsComponent } from '../card/card-details.component';
import { Header } from '../content/header.component';
import { Paragraph } from '../content/paragraph.component';
import { StaticText } from '../content/static-content.component';
import { FileUploadComponent } from '../fileupload/file-upload.component';
import { FormElement } from '../form-element.component';
import { FormErrorMessage } from '../form-error-message.component';
import { FrmGroupCmp } from '../form-group.component';
import { Form } from '../form.component';
import {
  ActionDropdown,
  ActionLink
} from '../form/elements/action-dropdown.component';
import { ButtonGroup } from '../form/elements/button-group.component';
import { Calendar } from '../form/elements/calendar.component';
import { CheckBoxGroup } from '../form/elements/checkbox-group.component';
import { CheckBox } from '../form/elements/checkbox.component';
import { ComboBox } from '../form/elements/combobox.component';
import { HeaderCheckBox } from '../form/elements/header-checkbox.component';
import { InPlaceEditorComponent } from '../form/elements/inplace-editor.component';
import { InputLabel } from '../form/elements/input-label.component';
import { InputLegend } from '../form/elements/input-legend.component';
import { InputSwitch } from '../form/elements/input-switch.component';
import { MultiselectCard } from '../form/elements/multi-select-card.component';
import { MultiSelectListBox } from '../form/elements/multi-select-listbox.component';
import { OrderablePickList } from '../form/elements/picklist.component';
import { RadioButton } from '../form/elements/radio.component';
import { RichText } from '../form/elements/rich-text.component';
import { Signature } from '../form/elements/signature.component';
import { TextArea } from '../form/elements/textarea.component';
import { InputText } from '../form/elements/textbox.component';
import { FormGridFiller } from '../form/form-grid-filler.component';
import { DataTable } from '../grid/table.component';
import { Image } from '../image.component';
import { Link } from '../link.component';
import { Menu } from '../menu.component';
import { MessageComponent } from '../message/message.component';
import { Section } from '../section.component';
import { SvgComponent } from '../svg/svg.component';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { TreeGrid } from '../tree-grid/tree-grid.component';
import { CounterMessageService } from './../../../services/counter-message.service';
import { NmMessageService } from './../../../services/toastmessage.service';
import { NmChart } from './../charts/chart.component';
import { NmAutocomplete } from './../form/elements/autocomplete.component';
import { InputMaskComp } from './../form/elements/input-mask.component';
import { TableHeader } from './../grid/table-header.component';
import { Accordion } from './accordion.component';
import { Label } from './label.component';
import { Tab } from './tab.component';

let pageService, configService;

class MockPageService {
  eventUpdate$: Subject<any>;
  validationUpdate$: Subject<any>;
  gridValueUpdate$: Subject<any>;

  constructor() {
    this.eventUpdate$ = new Subject();
    this.validationUpdate$ = new Subject();
    this.gridValueUpdate$ = new Subject();
  }
  processEvent(a, b, c, d) {}
}

@Component({
  template: '<div></div>',
  selector: 'nm-button'
})
class Button {
  @Input() element: any;
  @Input() payload: string;
  @Input() form: any;
  @Input() actionTray?: boolean;

  @Output() buttonClickEvent = new EventEmitter();

  @Output() elementChange = new EventEmitter();
  private imagesPath: string;
  private btnClass: string;
  private disabled: boolean;
  files: any;
  differ: any;
  componentTypes;
}

class MockLoggerService {
  debug() {}
  info() {}
  error() {}
}

const declarations = [
  Accordion,
  CardDetailsComponent,
  Link,
  CardDetailsFieldComponent,
  StaticText,
  InPlaceEditorComponent,
  InputText,
  TextArea,
  ComboBox,
  DateTimeFormatPipe,
  TooltipComponent,
  SelectItemPipe,
  Image,
  FrmGroupCmp,
  SvgComponent,
  FormElement,
  Button,
  ButtonGroup,
  Signature,
  Calendar,
  RadioButton,
  CheckBoxGroup,
  CheckBox,
  MultiSelectListBox,
  MultiselectCard,
  OrderablePickList,
  FileUploadComponent,
  DataTable,
  TableHeader,
  MessageComponent,
  Header,
  Paragraph,
  HeaderCheckBox,
  ActionDropdown,
  Section,
  ActionLink,
  CardDetailsGrid,
  Menu,
  Form,
  Label,
  CardDetailsFieldGroupComponent,
  DisplayValueDirective,
  InputLabel,
  TreeGrid,
  FormGridFiller,
  InputSwitch,
  InputLegend,
  FormErrorMessage,
  PrintDirective,
  InputMaskComp,
  NmAutocomplete,
  Tab,
  NmChart,
  RichText
];
const imports = [
  FormsModule,
  HttpModule,
  HttpClientModule,
  StorageServiceModule,
  AngularSvgIconModule,
  ReactiveFormsModule,
  DataTableModule,
  SharedModule,
  OverlayPanelModule,
  PickListModule,
  ChartModule,
  DragDropModule,
  CalendarModule,
  FileUploadModule,
  ListboxModule,
  DialogModule,
  CheckboxModule,
  DropdownModule,
  RadioButtonModule,
  ProgressBarModule,
  ProgressSpinnerModule,
  AccordionModule,
  GrowlModule,
  TableModule,
  KeyFilterModule,
  ToastModule,
  InputSwitchModule,
  TreeTableModule,
  BrowserAnimationsModule,
  InputMaskModule,
  TabViewModule,
  AutoCompleteModule,
  TooltipModule,
  EditorModule
];
const providers = [
  { provide: CUSTOM_STORAGE, useExisting: SESSION_STORAGE },
  { provide: 'JSNLOG', useValue: JL },
  { provide: LocationStrategy, useClass: HashLocationStrategy },
  { provide: PageService, useClass: MockPageService },
  { provide: LoggerService, useClass: MockLoggerService },
  CustomHttpClient,
  LoaderService,
  ConfigService,
  SessionStoreService,
  AppInitService,
  Location,
  GridService,
  PrintService,
  NmMessageService,
  ChangeDetectorRef,
  CounterMessageService
];
let fixture, hostComponent, changeDetectorRef;
describe('Accordion', () => {
  configureTestSuite(() => {
    setup(declarations, imports, providers);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Accordion);
    hostComponent = fixture.debugElement.componentInstance;
    hostComponent.element = accordionElementWithForm as Param;
    pageService = TestBed.get(PageService);
    configService = TestBed.get(ConfigService);
    changeDetectorRef = TestBed.get(ChangeDetectorRef);
  });

  it('should create the Accordion', async(() => {
    expect(hostComponent).toBeTruthy();
  }));

  it('Expand All and Collapse All should be created if showExpandAll attribute configured', async(() => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const expandAllndCollapseEle = debugElement.queryAll(
      By.css('.btn.btn-expand')
    );
    expect(
      expandAllndCollapseEle[0].nativeElement.innerText.toString()
    ).toEqual('Expand All');
    expect(
      expandAllndCollapseEle[1].nativeElement.innerText.toString()
    ).toEqual('Collapse All');
  }));

  it('Expand All and Collapse All should not be created if showExpandAll attribute is not configured', async(() => {
    hostComponent.element.config.uiStyles.attributes.showExpandAll = false;
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const expandAllndCollapseEle = debugElement.queryAll(
      By.css('.btn.btn-expand')
    );
    expect(expandAllndCollapseEle.length).toEqual(0);
  }));

  it('Onclick of expand all button the openAll() should be called', async(() => {
    hostComponent.element.config.uiStyles.attributes.showExpandAll = true;
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const expandAllndCollapseEle = debugElement.queryAll(
      By.css('.btn.btn-expand')
    );
    spyOn(hostComponent, 'openAll').and.callThrough();
    expandAllndCollapseEle[0].nativeElement.click();
    expect(hostComponent.openAll).toHaveBeenCalled();
  }));

  it('Onclick of Collapse all button the closeAll() should be called', async(() => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const expandAllndCollapseEle = debugElement.queryAll(
      By.css('.btn.btn-expand')
    );
    spyOn(hostComponent, 'closeAll').and.callThrough();
    expandAllndCollapseEle[1].nativeElement.click();
    expect(hostComponent.closeAll).toHaveBeenCalled();
  }));

  it('p-accordion should not be created if element.visible is false', async(() => {
    hostComponent.element.visible = false;
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const pAccordionEle = debugElement.query(By.css('p-accordion'));
    expect(pAccordionEle).toBeFalsy();
  }));

  it('p-accordion should be created if element.visible is true', async(() => {
    hostComponent.element.visible = true;
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const pAccordionEle = debugElement.query(By.css('p-accordion'));
    expect(pAccordionEle).toBeTruthy();
  }));

  it('p-accordionTab should be created if element.type.model.params[0].visible is true', async(() => {
    hostComponent.element.type.model.params[0].visible = true;
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const pAccordionTab = debugElement.query(By.css('p-accordionTab'));
    expect(pAccordionTab).toBeTruthy();
  }));

  it('Label in header should be created on configuring @Label', async(() => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const nmLabelEle = debugElement.query(By.css('nm-label'));
    expect(nmLabelEle).toBeTruthy();
  }));

  it('Edit Button should be created if editable is configured', async(() => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const editButtonEle = debugElement.query(By.css('.btn.btn-plain'));
    expect(editButtonEle).toBeTruthy();
    expect(editButtonEle.nativeElement.innerText.toString()).toEqual('Edit');
  }));

  it('Onclick of edit button processOnClick() should be called', async(() => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const editButtonEle = debugElement.query(By.css('.btn.btn-plain'));
    spyOn(hostComponent, 'processOnClick').and.callThrough();
    editButtonEle.nativeElement.click();
    expect(hostComponent.processOnClick).toHaveBeenCalled();
    expect(hostComponent.processOnClick).toHaveBeenCalledWith(
      accordionElementWithForm.type.model.params[0]
    );
  }));

  it('If element.type.model.params[0].type.model.params[i] and form is defined then form group should be created', async(() => {
    hostComponent.form = new FormGroup({
      question123: new FormControl(),
      txt1: new FormControl()
    });
    hostComponent.ngOnDestroy = () => {};
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const frmGrpEle = debugElement.query(By.css('nm-frm-grp'));
    expect(frmGrpEle).toBeTruthy();
  }));

  it('If form is undefined and @ButtonGroup configured then button group should be created ', async(() => {
    hostComponent.element = accordionElementWithNoForm as Param;
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const buttonGroupEle = debugElement.query(By.css('nm-button-group'));
    expect(buttonGroupEle).toBeTruthy();
  }));

  it('If form is undefined and @ButtonGroup is not configured then button group should not be created ', async(() => {
    hostComponent.element = accordionElementWithNoForm as Param;
    hostComponent.element.type.model.params[0].type.model.params[5].alias = '';
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const buttonGroupEle = debugElement.query(By.css('nm-button-group'));
    expect(buttonGroupEle).toBeFalsy();
  }));

  it('If form is undefined and @Link is configured then Link should be created ', async(() => {
    hostComponent.element = accordionElementWithNoForm as Param;
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const linkEle = debugElement.query(By.css('nm-link'));
    expect(linkEle).toBeTruthy();
  }));

  it('If form is undefined and @Link is not configured then Link should not be created ', async(() => {
    hostComponent.element = accordionElementWithNoForm as Param;
    hostComponent.element.type.model.params[0].type.model.params[6].alias = '';
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const linkEle = debugElement.query(By.css('nm-link'));
    expect(linkEle).toBeFalsy();
  }));

  it('If form is undefined and @Grid is configured then table should be created ', async(() => {
    hostComponent.element = accordionElementWithNoForm as Param;
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const gridEle = debugElement.query(By.css('nm-table'));
    expect(gridEle).toBeTruthy();
  }));

  it('If form is undefined and @Grid is not configured then table should not be created ', async(() => {
    hostComponent.element = accordionElementWithNoForm as Param;
    hostComponent.element.type.model.params[0].type.model.params[7].alias = '';
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const gridEle = debugElement.query(By.css('nm-table'));
    expect(gridEle).toBeFalsy();
  }));

  it('If form is undefined and @CardDetail is configured then cardDetail should be created ', async(() => {
    hostComponent.element = accordionElementWithNoForm as Param;
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const cardDetailEle = debugElement.query(By.css('nm-card-details'));
    expect(cardDetailEle).toBeTruthy();
  }));

  it('If form is undefined and @CardDetail is not configured then cardDetail should not be created ', async(() => {
    hostComponent.element = accordionElementWithNoForm as Param;
    hostComponent.element.type.model.params[0].type.model.params[8].alias = '';
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const cardDetailEle = debugElement.query(By.css('nm-card-details'));
    expect(cardDetailEle).toBeFalsy();
  }));

  it('If form is undefined and @CardDetailsGrid then cardDetailsGrid should be created ', async(() => {
    hostComponent.element = accordionElementWithNoForm as Param;
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const cardDetailsGridEle = debugElement.query(
      By.css('nm-card-details-grid')
    );
    expect(cardDetailsGridEle).toBeTruthy();
  }));

  it('If form is undefined and @CardDetailsGrid is not configured then cardDetailsGrid should not be created ', async(() => {
    hostComponent.element = accordionElementWithNoForm as Param;
    hostComponent.element.type.model.params[0].type.model.params[9].alias = '';
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const cardDetailsGridEle = debugElement.query(
      By.css('nm-card-details-grid')
    );
    expect(cardDetailsGridEle).toBeFalsy();
  }));

  it('If form is undefined and form is configured in nested level then form should be created ', async(() => {
    hostComponent.element = accordionElementWithNoForm as Param;
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const formEle = debugElement.query(By.css('nm-form'));
    expect(formEle).toBeTruthy();
  }));

  it('If form is undefined and form is not configured in nested level also then form should not be created ', async(() => {
    hostComponent.element = accordionElementWithNoForm as Param;
    hostComponent.element.type.model.params[0].type.model.params[10].alias = '';
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const formEle = debugElement.query(By.css('nm-form'));
    expect(formEle).toBeFalsy();
  }));

  it('get multiple() should return the this.element.config.uiStyles.attributes.multiple value', async(() => {
    fixture.whenStable().then(() => {
      hostComponent.element.config.uiStyles.attributes.multiple = false;
      expect(hostComponent.multiple).toEqual(false);
    });
  }));

  it('closeAll should clear the index array', async(() => {
    hostComponent.accordion = new Accordion(pageService);
    hostComponent.accordion['tabs'] = true;
    hostComponent.index = [1, 2, 3];
    hostComponent.closeAll();
    expect(hostComponent.index).toEqual([-1]);
  }));

  it('closeAll should not clear the index array', async(() => {
    hostComponent.accordion = new Accordion(pageService);
    hostComponent.accordion['tabs'] = false;
    hostComponent.index = [1, 2, 3];
    hostComponent.closeAll();
    expect(hostComponent.index).toEqual([1, 2, 3]);
  }));

  it('openAll() should update index array', async(() => {
    hostComponent.accordion = new Accordion(pageService);
    hostComponent.accordion['tabs'] = [1, 2, 3];
    hostComponent.index = [];
    hostComponent.openAll();
    expect(hostComponent.index.length).toEqual(3);
  }));

  it('openAll() should not update index array', async(() => {
    hostComponent.accordion = new Accordion(pageService);
    hostComponent.index = [];
    hostComponent.openAll();
    expect(hostComponent.index.length).toEqual(0);
  }));

  it('processOnClick() should call processEvent()', async(() => {
    spyOn(pageService, 'processEvent').and.callThrough();
    const test = new Param(configService);
    hostComponent.processOnClick(test);
    expect(pageService.processEvent).toHaveBeenCalled();
    expect(pageService.processEvent).toHaveBeenCalledWith(
      undefined,
      '$execute',
      null,
      'POST'
    );
  }));

  it('Edit Button should not be created if editable attribute is configured as false', async(() => {
    hostComponent.element.type.model.params[0].config.uiStyles.attributes.editable = false;
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const editButtonEle = debugElement.query(By.css('.btn.btn-plain'));
    expect(editButtonEle).toBeFalsy();
  }));

  it('If nested param object and form is undefined then form group should not be created', async(() => {
    hostComponent.form = null;
    hostComponent.element.type.model.params[0].type.model.params = [];
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const frmGrpEle = debugElement.query(By.css('nm-frm-grp'));
    expect(frmGrpEle).toBeFalsy();
  }));

  it('nm-counter-message in pheader should be created if showMessages attribute is configured as true', async(() => {
    hostComponent.element.type.model.params[0].config.uiStyles.attributes.selected = true;
    hostComponent.element.config.uiStyles.attributes.showMessages = true;
    hostComponent.form = new FormGroup({
      question123: new FormControl(),
      txt1: new FormControl()
    });
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const counterMessageEle = debugElement.query(By.css('nm-counter-message'));
    expect(counterMessageEle).toBeTruthy();
  }));

  it('nm-counter-message in pheader should not be created if showMessages attribute is configured as false', async(() => {
    hostComponent.element.type.model.params[0].config.uiStyles.attributes.selected = true;
    hostComponent.element.config.uiStyles.attributes.showMessages = false;
    hostComponent.form = new FormGroup({
      question123: new FormControl(),
      txt1: new FormControl()
    });
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const counterMessageEle = debugElement.query(By.css('nm-counter-message'));
    expect(counterMessageEle).toBeFalsy();
  }));

  it('Label in header should not be created on if element.type.model.params[] is empty', async(() => {
    hostComponent.element.type.model.params = [];
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const nmLabelEle = debugElement.query(By.css('nm-label'));
    expect(nmLabelEle).toBeFalsy();
  }));
});
