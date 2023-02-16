import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { Productos } from 'src/app/models/productos';
import { DialogService } from 'src/app/_services/dialog.service';
import { MessagesService } from 'src/app/_services/messages.service';
import { ProductosService } from 'src/app/_services/producto.service';
import { EditProductosComponent } from './edit-productos/edit-productos.component';

@Component({
  selector: 'app-activos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  row: any;
  listProductos!: Observable<Productos[]>;


  displayedColumns: string[] = [

    'nombre',
    'valor',
    'fecha_vencimiento',
    'cantidad',
    'proveedor',
    'acciones'
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  currentPersonal: {} | undefined;
  currentIndex: number | undefined;


  constructor(private dialog: MatDialog,
    private dialogService: DialogService,
    private productosService: ProductosService,
    private toast: NgToastService,
    private messages: MessagesService) { }

  ngOnInit(): void {

    this.loadingProductos();
    this.productosService.listProductos().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadingProductos() {
    this.listProductos = this.productosService.listProductos();
  }


  deleteProducto(id: any) {
    this.dialogService
      .openConfirmDialog('¿Está seguro de eliminar Periferico?')
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.productosService.deleteProducto(id).subscribe(
            (data: any) => {
              this.messages.menssageSuccessful(
                'Acción Ejectuada',
                'Producto Eliminado'
              );
              this.refreshList();
            },
            (error: any) => {
              this.messages.menssageInfo(
                'Atención',
                'Error al Elminar Producto'
              )
            }
          )
        }
      })
  }


  refreshList(): void {
    window.location.reload();
    this.currentPersonal = {};
    this.currentIndex = -1;
  }


  editProducto(row: any) {
    this.dialog
      .open(EditProductosComponent, {
        width: '50%',
        data: row
      })
      .afterClosed()
      .subscribe((val: any) => {
        if (val === 'Modificar Producto') {
          this.refreshList();
        }
      })
  }


}
