// import { LoadingComponent } from '@components';
// import { DMN_ORIGEM_LOG } from '@domains';
// import { LogAcessoEntidade } from '@entidades';
// import { Box, Button, Col, ComboBox, Input, Row } from '@intech/web-ui';
// import { ResponsiveLine } from '@nivo/line';
// import { LogService } from '@services';
// import { parse, startOfYear } from 'date-fns';
// import { format } from 'date-fns/esm';
// import { result } from 'lodash';
// import React, { useEffect, useState } from 'react';
// import { FaFilter } from 'react-icons/fa';
// import { Totais, TotalItem } from './styles';

// export const LogAcesso: React.FC = () => {
//   const [LogsAcesso, setLogsAcesso] = useState<LogAcessoEntidade[]>([]);
//   const [Loading, setLoading] = useState(false);

//   const [DataInicio, setDataInicio] = useState(format(startOfYear(new Date()), 'dd/MM/yyyy'));
//   const [DataFim, setDataFim] = useState(format(new Date(), 'dd/MM/yyyy'));
//   const [Origem, setOrigem] = useState('TODOS');
//   const [SistemaOperacional, setSistemaOperacional] = useState('TODOS');

//   const [DadosGrafico, setDadosGrafico] = useState(null);

//   useEffect(() => {
//     (async () => {
//       await loadData();
//     })();
//   }, []);

//   const groupBy = (items, key) =>
//     items.reduce(
//       (result, item) => ({
//         ...result,
//         [item[key]]: [...(result[item[key]] || []), item]
//       }),
//       {}
//     );

//   useEffect(() => {
//     const logsPortal = LogsAcesso.filter((x) => x.IND_ORIGEM === DMN_ORIGEM_LOG.PORTAL);
//     const portalData = fillLine(logsPortal);

//     const logsAndroid = LogsAcesso.filter((x) => x.IND_ORIGEM === DMN_ORIGEM_LOG.MOBILE && x.TXT_SO === 'android');
//     const androidData = fillLine(logsAndroid);

//     const logsios = LogsAcesso.filter((x) => x.IND_ORIGEM === DMN_ORIGEM_LOG.MOBILE && x.TXT_SO === 'ios');
//     const iosData = fillLine(logsios);

//     const data = [];

//     if (portalData.length > 0) {
//       data.push({
//         id: 'Portal',
//         data: portalData
//       });
//     }

//     if (androidData.length > 0) {
//       data.push({
//         id: 'Mobile Android',
//         data: androidData
//       });
//     }

//     if (iosData.length > 0) {
//       data.push({
//         id: 'Mobile iOS',
//         data: iosData
//       });
//     }

//     setDadosGrafico(data);
//   }, [LogsAcesso]);

//   useEffect(() => {
//     if (Origem === 'TODOS' || Origem === DMN_ORIGEM_LOG.PORTAL) setSistemaOperacional('TODOS');
//   }, [Origem]);

//   const loadData = async () => {
//     setLoading(true);
//     const logs = await LogService.BuscarLista({ DataInicio, DataFim, Origem, SistemaOperacional });
//     setLogsAcesso(logs);
//     setLoading(false);
//   };

//   const fillLine = (logs) => {
//     const data = logs.reduce((previousValue, current) => {
//       const date = parse(current.DTA_ACESSO.toString(), 'dd/MM/yyyy', new Date());
//       const formattedDate = format(date, 'MM/yyyy');

//       if (previousValue.filter((item) => item.x === formattedDate).length === 0) previousValue.push({ x: formattedDate, y: 0 });

//       return previousValue;
//     }, []);

//     for (const item of data) {
//       item.y = logs.filter((item2) => {
//         const date = parse(item2.DTA_ACESSO.toString(), 'dd/MM/yyyy', new Date());
//         const formattedDate = format(date, 'MM/yyyy');

//         return formattedDate === item.x;
//       }).length;
//     }

//     return data;
//   };

//   return (
//     <>
//       <Box title="Filtros">
//         <Row>
//           <Col className="col-7">
//             <Input type="date" value={DataInicio} onChange={setDataInicio} title="Data Início" labelSize={5} />
//             <Input type="date" value={DataFim} onChange={setDataFim} title="Data Fim" labelSize={5} />

//             <ComboBox
//               title="Origem"
//               data={['TODOS', DMN_ORIGEM_LOG.PORTAL, DMN_ORIGEM_LOG.MOBILE]}
//               value={Origem}
//               onChange={setOrigem}
//               labelSize={5}
//             />

//             <ComboBox
//               title="Sistema Operacional"
//               data={['TODOS', 'ios', 'android']}
//               value={SistemaOperacional}
//               onChange={setSistemaOperacional}
//               labelSize={5}
//               disabled={Origem !== 'MOBILE'}
//             />

//             <Button type="primary" onClick={loadData} title="Filtrar dados" icon={<FaFilter />} />
//           </Col>
//         </Row>
//       </Box>
//       {Loading && <LoadingComponent />}
//       {!Loading && (
//         <>
//           <Box>
//             <Totais>
//               <TotalItem>
//                 Total de Acessos Portal:
//                 <div>{LogsAcesso.filter((x) => x.IND_ORIGEM === DMN_ORIGEM_LOG.PORTAL).length.toLocaleString('pt-br')}</div>
//               </TotalItem>

//               <TotalItem>
//                 Total de Acessos Mobile (Android):
//                 <div>{LogsAcesso.filter((x) => x.IND_ORIGEM === DMN_ORIGEM_LOG.MOBILE && x.TXT_SO === 'android').length.toLocaleString('pt-br')}</div>
//               </TotalItem>

//               <TotalItem>
//                 Total de Acessos Mobile (iOS):
//                 <div>{LogsAcesso.filter((x) => x.IND_ORIGEM === DMN_ORIGEM_LOG.MOBILE && x.TXT_SO === 'ios').length.toLocaleString('pt-br')}</div>
//               </TotalItem>
//             </Totais>
//           </Box>

//           <Box>
//             <div style={{ width: '100%', height: '400px' }}>
//               <ResponsiveLine
//                 data={DadosGrafico}
//                 margin={{ top: 50, right: 50, bottom: 110, left: 60 }}
//                 xScale={{ type: 'point' }}
//                 axisTop={null}
//                 axisRight={null}
//                 axisBottom={{
//                   orient: 'bottom',
//                   tickSize: 5,
//                   tickPadding: 5,
//                   tickRotation: 0,
//                   legend: 'Ano',
//                   legendOffset: 36,
//                   legendPosition: 'middle'
//                 }}
//                 axisLeft={{
//                   orient: 'left',
//                   tickSize: 5,
//                   tickPadding: 5,
//                   tickRotation: 0,
//                   legend: 'Valor',
//                   legendOffset: -40,
//                   legendPosition: 'middle'
//                 }}
//                 colors={{ scheme: 'category10' }}
//                 pointSize={10}
//                 pointColor={{ theme: 'background' }}
//                 pointBorderWidth={2}
//                 pointBorderColor={{ from: 'serieColor' }}
//                 pointLabelYOffset={-12}
//                 useMesh={true}
//                 legends={[
//                   {
//                     anchor: 'bottom',
//                     direction: 'row',
//                     justify: false,
//                     translateX: 0,
//                     translateY: 70,
//                     itemsSpacing: 0,
//                     itemDirection: 'left-to-right',
//                     itemWidth: 200,
//                     itemHeight: 20,
//                     itemOpacity: 0.75,
//                     symbolSize: 12,

//                     symbolBorderColor: 'rgba(0, 0, 0, .5)',
//                     effects: [
//                       {
//                         on: 'hover',
//                         style: {
//                           itemBackground: 'rgba(0, 0, 0, .03)',
//                           itemOpacity: 1
//                         }
//                       }
//                     ]
//                   }
//                 ]}
//               />
//             </div>
//           </Box>
//         </>
//       )}
//     </>
//   );
// };
export const a = "";